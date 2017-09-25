package com.nullpointerexception.model.mock;

import com.nullpointerexception.model.Service.FuelDataService;
import com.nullpointerexception.model.bean.FuelInfo;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ss on 2017/9/25.
 */
public class MockFuelDataProvider implements FuelDataService {

    @Override
    public List<FuelInfo> getData(int year) {

        List<FuelInfo> infoList = new ArrayList<>();
        for (int i = 1; i < 11; i++) {
            infoList.add(new FuelInfo("country" + i, i, year, i * i));
        }

        return infoList;
    }
}
