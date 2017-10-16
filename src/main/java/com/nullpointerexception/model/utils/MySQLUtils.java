package com.nullpointerexception.model.utils;

import com.nullpointerexception.configuration.MySQLConfig;
import com.nullpointerexception.model.bean.FuelInfoBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
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
            conn = DriverManager
                    .getConnection(mySQLConfig.getURL(), mySQLConfig.getUserName(), mySQLConfig.getPassword());
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
            String query = "SELECT areaName, longitude, latitude, amount FROM v_totalenergy";
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

    public List<FuelInfoBean> transferToFuelInfoBeanList(ResultSet resultSet){

        return null;
    }
}
