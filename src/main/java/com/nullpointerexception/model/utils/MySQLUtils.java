package com.nullpointerexception.model.utils;

import com.nullpointerexception.configuration.MySQLConfig;
import com.nullpointerexception.model.bean.FuelInfoBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.HTMLDocument;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

/**
 * Created by ss on 2017/9/20.
 */

@Service
public class MySQLUtils {

    @Autowired
    private MySQLConfig mySQLConfig;

    private Connection conn = null;
    private Statement stmt = null;
    private PreparedStatement preStmt = null;
    private ResultSet retSet = null;
    private final Double modifier = 0.90;

    public MySQLUtils(){
//        System.out.println("=======");
//        System.out.println(">>>>>>>>>>>>" + mySQLConfig.getURL() + " ; " + mySQLConfig.getUserName());
//        System.out.println("=======");
//        try {
//            Class.forName("com.mysql.jdbc.Driver");
//            conn = DriverManager
//                    .getConnection(mySQLConfig.getURL(), mySQLConfig.getUserName(), mySQLConfig.getPassword());
//            conn = DriverManager
//                    .getConnection("jdbc:mysql://localhost:3306/cmpe202?serverTimezone=GMT&useSSL=false", "cmpe202usr", "sesame");
//        } catch (ClassNotFoundException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        } catch (SQLException e) {
//            // TODO Auto-generated catch block
//            System.err.println("SQL ERROR, Exception");
//            System.err.println(e.getMessage());
//            e.printStackTrace();
//        }
    }

    public void buildConnection(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            System.out.println(mySQLConfig);
            conn = DriverManager
                    .getConnection(mySQLConfig.getURL(), mySQLConfig.getUserName(), mySQLConfig.getPassword());
//            conn = DriverManager
//                    .getConnection("jdbc:mysql://localhost:3306/cmpe202?serverTimezone=GMT&useSSL=false", "cmpe202usr", "sesame");
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            System.err.println("SQL ERROR, Exception");
            System.err.println(e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * Used to close resultset, statement and connection properly
     */
    public void close() {
        try {
            if (retSet != null) {
                retSet.close();
            }

            if (stmt != null) {
                stmt.close();
            }

            if (conn != null) {
                conn.close();
            }
        } catch (Exception e) {

        }
    }

    public List<FuelInfoBean> getCountryDataByYear(int year) {
        buildConnection();

        if (this.conn !=null){
            String query = "SELECT areaName, longitude, latitude, ifFlagImage, Quadrillion_BTU, Coal_Amount, CrudeOil_Amount, NaturalGas_Amount " +
                    "FROM v_totalenergy WHERE year = ? ORDER BY Quadrillion_BTU desc limit 10";
            try {
                preStmt = conn.prepareStatement(query);
                preStmt.setInt(1, year);

                retSet = preStmt.executeQuery();

            } catch (SQLException e) {
                // TODO Auto-generated catch block
                System.err.println("SQL ERROR, Exception");
                System.err.println(e.getMessage());
                e.printStackTrace();
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            return transferToFuelInfoBeanList(this.retSet);

        }
        else {
            System.out.println("No SQL connection");
        }

        return null;
    }

    public List<Double> getGeoAmountData(){
        buildConnection();

        if (this.conn !=null){
            String query = "SELECT areaName, longitude, latitude, SUM(Quadrillion_BTU) as sum FROM v_totalenergy GROUP BY areaName, longitude, latitude";
            try {
                preStmt = conn.prepareStatement(query);

                retSet = preStmt.executeQuery();

            } catch (SQLException e) {
                // TODO Auto-generated catch block
                System.err.println("SQL ERROR, Exception");
                System.err.println(e.getMessage());
                e.printStackTrace();
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            return transferGeoAmountData(this.retSet);

        }
        else {
            System.out.println("No SQL connection");
        }

        return null;
    }

    public List<FuelInfoBean> transferToFuelInfoBeanList(ResultSet resultSet){
        ArrayList<FuelInfoBean> ret = new ArrayList<FuelInfoBean>();

        String areaName = "";
        Double longitude = 0.0;
        Double latitude = 0.0;
        Double amount = 0.0;
        Double coalAmount = 0.0;
        Double crudeOilAmount = 0.0;
        Double naturalGasAmount = 0.0;
        boolean ifFlagImage = false;
        try {
            while (resultSet.next()){
                areaName = resultSet.getString("areaName");
                longitude = resultSet.getDouble("longitude");
                latitude = resultSet.getDouble("latitude");
                ifFlagImage = resultSet.getBoolean("ifFlagImage");
                amount = resultSet.getDouble("Quadrillion_BTU");
                coalAmount = resultSet.getDouble("Coal_Amount");
                crudeOilAmount = resultSet.getDouble("CrudeOil_Amount");
                naturalGasAmount = resultSet.getDouble("NaturalGas_Amount");
//                System.out.println("Row[" + resultSet.getRow() + "]:\t" + areaName + "\t" + longitude + "\t" + latitude + "\t" + amount);
                ret.add(new FuelInfoBean(areaName, longitude, latitude, amount, coalAmount, crudeOilAmount, naturalGasAmount, generateFlagPath(areaName, ifFlagImage)));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return ret;
    }

    public List<Double> transferGeoAmountData(ResultSet resultSet){
        ArrayList<Double> ret = new ArrayList<Double>();

        Double longitude = 0.0;
        Double latitude = 0.0;
        Double amount = 0.0;
        Double max = 0.0;
        try {
            while (resultSet.next()){
                longitude = resultSet.getDouble("longitude");
                latitude = resultSet.getDouble("latitude");
                amount = resultSet.getDouble("sum");
//                System.out.println("Row[" + resultSet.getRow() + "]:\t" + longitude + "\t" + latitude + "\t" + amount);
                ret.add(longitude);
                ret.add(latitude);
                ret.add(amount);
                // update max
                if (amount >max) {
                    max = amount;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        max = max /1.5;
        Double temp = 0.0;
        List<Double> decoratedDataList = new ArrayList<Double>();
        for (int i =2; i <ret.size(); i+=3){
            temp = ret.get(i) /max;
            if (temp < 0.01){
                temp = 0.01;
            }
            else {
                // Add decorated data
                decoratedDataList.addAll(generateDecoratedData(ret.get(i-2), ret.get(i-1), temp));
            }
//            System.out.println("IDX[" + i + "]: " + temp);
            ret.set(i, temp);
        }

        ret.addAll(decoratedDataList);

        return ret;
    }

    public String generateFlagPath(String areaName, boolean ifFlagImage){
        String ret = "../images/flags/World.png";        // Default to "World.png"

        if (ifFlagImage){
            ret = "../images/flags/" + areaName + ".png";
        }

        return ret;
    }

    public List<Double> generateDecoratedData(Double latitude, Double longitude, Double height){
        List<Double> ret = new ArrayList<Double>();

        for (int i =0; i <=4; i++){
            for (int j =i-4; j <=4-i; i++){
                if (j !=0){
                    ret.add(latitude +i);
                    ret.add(longitude +j);
                    ret.add(height /Math.abs(j) *modifier *Math.random());
                    ret.add(latitude -i);
                    ret.add(longitude +j);
                    ret.add(height /Math.abs(j) *modifier *Math.random());
                }
            }
        }

        return ret;
    }

    public static void main(String[] args){
//        MySQLUtils mySQLUtils = new MySQLUtils();
//        List<FuelInfoBean> myList_1 =mySQLUtils.getCountryDataByYear();
//        Iterator<FuelInfoBean> itr = myList_1.iterator();
//        FuelInfoBean tempBean;
//        while (itr.hasNext()){
//            tempBean = itr.next();
//            System.out.println(tempBean.getFlagPath());
//        }

//        List<Double> myList_2 =mySQLUtils.getGeoAmountData();
//        Iterator<Double> itr = myList_2.iterator();
//        Double tempDouble;
//        String output = "[";
//        while (itr.hasNext()){
//            tempDouble = itr.next();
//            output +=(tempDouble + ",");
//        }
//        output = output.substring(0, output.length()-1) + "]";
//        System.out.println(output);
//        System.out.println("");
    }
}
