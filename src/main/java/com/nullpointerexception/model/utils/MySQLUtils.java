package com.nullpointerexception.model.utils;

import com.nullpointerexception.configuration.MySQLConfig;
import com.nullpointerexception.model.bean.FuelInfoBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
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

    public MySQLUtils(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
//            conn = DriverManager
//                    .getConnection(mySQLConfig.getURL(), mySQLConfig.getUserName(), mySQLConfig.getPassword());
            conn = DriverManager
                    .getConnection("jdbc:mysql://localhost:3306/cmpe202?serverTimezone=GMT&useSSL=false", "cmpe202usr", "sesame");
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

    public List<FuelInfoBean> getCountryDataByYear() {

        if (this.conn !=null){
            String query = "SELECT areaName, longitude, latitude, Quadrillion_BTU FROM v_totalenergy";
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
            return transferToFuelInfoBeanList(this.retSet);

        }
        else {
            System.out.println("No SQL connection");
        }

        return null;
    }

    public List<Double> getGeoAmountData(){
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
        try {
            while (resultSet.next()){
                areaName = resultSet.getString("areaName");
                longitude = resultSet.getDouble("longitude");
                latitude = resultSet.getDouble("latitude");
                amount = resultSet.getDouble("Quadrillion_BTU");
//                System.out.println("Row[" + resultSet.getRow() + "]:\t" + areaName + "\t" + longitude + "\t" + latitude + "\t" + amount);
                ret.add(new FuelInfoBean(areaName, longitude, latitude, amount));
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

        max = max /1.8;
        Double temp = 0.0;
        for (int i =2; i <ret.size(); i+=3){
            temp = ret.get(i) /max;
            if (temp < 0.01){
                temp = 0.01;
            }
//            System.out.println("IDX[" + i + "]: " + temp);
            ret.set(i, temp);
        }

        return ret;
    }

    public static void main(String[] args){
        MySQLUtils mySQLUtils = new MySQLUtils();
        List<FuelInfoBean> myList_1 =mySQLUtils.getCountryDataByYear();
//        List<Double> myList_2 =mySQLUtils.getGeoAmountData();
        System.out.println("");
    }
}
