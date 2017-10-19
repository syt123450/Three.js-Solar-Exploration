package com.nullpointerexception.model.mock;

import com.nullpointerexception.model.service.FuelDataService;
import com.nullpointerexception.model.bean.FuelInfoBean;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ss on 2017/9/25.
 */
public class MockFuelDataProvider implements FuelDataService {

    @Override
    public List<FuelInfoBean> getYearlyData(int year) {

        List<FuelInfoBean> infoList = new ArrayList<>();
        for (int i = 1; i < 11; i++) {
            infoList.add(new FuelInfoBean("country" + i, i, year, i * i));
        }

        return infoList;
    }

    @Override
    public List<Double> getAllData() {
        return null;
    }
}
