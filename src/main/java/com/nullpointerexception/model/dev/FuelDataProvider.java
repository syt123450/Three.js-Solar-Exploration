package com.nullpointerexception.model.dev;

import com.nullpointerexception.model.Service.FuelDataService;
import com.nullpointerexception.model.bean.FuelInfo;
import com.nullpointerexception.model.utils.MySQLUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by ss on 2017/9/25.
 */
public class FuelDataProvider implements FuelDataService {

    @Autowired
    private MySQLUtils mySQLUtils;

    @Override
    public List<FuelInfo> getData(int year) {
        return mySQLUtils.getCountryDataByYear();
    }
}
