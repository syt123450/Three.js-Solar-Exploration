package com.nullpointerexception.model.utils;

import com.nullpointerexception.configuration.MySQLConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by ss on 2017/9/20.
 */

@Service
public class MySQLUtils {

    @Autowired
    private MySQLConfig mySQLConfig;
    private final String URL = mySQLConfig.getURL();
    private final String USERNAME = mySQLConfig.getUserName();
    private final String PASSWORD = mySQLConfig.getPassword();


}
