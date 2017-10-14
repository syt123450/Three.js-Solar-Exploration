package com.nullpointerexception.model.dev;

import com.nullpointerexception.model.service.FuelDataService;
import com.nullpointerexception.model.bean.FuelInfoBean;
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
    public List<FuelInfoBean> getData(int year) {

        mySQLUtils.getCountryDataByYear();

        return null;
    }
}
