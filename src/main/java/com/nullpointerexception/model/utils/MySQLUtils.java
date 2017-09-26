package com.nullpointerexception.model.utils;

import com.nullpointerexception.configuration.MySQLConfig;
import com.nullpointerexception.model.bean.FuelInfoBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by ss on 2017/9/20.
 */

@Service
public class MySQLUtils {

    @Autowired
    private MySQLConfig mySQLConfig;

    public List<FuelInfoBean> getCountryDataByYear() {

        return null;
    }
}
