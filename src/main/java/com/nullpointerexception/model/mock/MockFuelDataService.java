package com.nullpointerexception.model.mock;

import com.nullpointerexception.model.service.FuelDataService;
import com.nullpointerexception.model.bean.FuelInfoBean;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ss on 2017/9/25.
 */
public class MockFuelDataService implements FuelDataService {

    @Override
    public List<FuelInfoBean> getYearlyData(int year) {

        List<FuelInfoBean> infoList = new ArrayList<>();
        for (int i = 1; i < 11; i++) {
            infoList.add(new FuelInfoBean(
                    "country" + i, i, year,
                    i * i,
                    i + 1,
                    i + 2,
                    i + 3,
                    "../images/flags/Abkhazia.png"));
        }

        return infoList;
    }

    @Override
    public List<Double> getAllData() {

        double latitude1 = 39.92;
        double longitude1 = 116.46;
        double amount1 = 0.5;
        double latitude2 = 37.3382;
        double longitude2 = -121.8863;
        double amount2 = 0.4;

        List<Double> totalList = new ArrayList<>();
        totalList.add(latitude1);
        totalList.add(longitude1);
        totalList.add(amount1);
        totalList.add(latitude2);
        totalList.add(longitude2);
        totalList.add(amount2);

        return totalList;
    }
}
