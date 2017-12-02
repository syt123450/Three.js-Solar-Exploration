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

        System.out.println("111");

        List<FuelInfoBean> infoList = new ArrayList<>();

        FuelInfoBean fuelInfoBean1 = new FuelInfoBean(
                "Africa",
                -8.783195,
                34.508523,
                536.53,
                0,
                57,
                211,
                "../images/flags/World.png"
        );

        FuelInfoBean fuelInfoBean2 = new FuelInfoBean(
                "Africa",
                -10,
                20.508523,
                536.53,
                0,
                57,
                211,
                "../images/flags/World.png"
        );

        FuelInfoBean fuelInfoBean3 = new FuelInfoBean(
                "Africa",
                8,
                33,
                536.53,
                0,
                57,
                211,
                "../images/flags/World.png"
        );

        FuelInfoBean fuelInfoBean4 = new FuelInfoBean(
                "Africa",
                40,
                70,
                536.53,
                0,
                57,
                211,
                "../images/flags/World.png"
        );

        FuelInfoBean fuelInfoBean5 = new FuelInfoBean(
                "Africa",
                12,
                66,
                536.53,
                0,
                57,
                211,
                "../images/flags/World.png"
        );

        FuelInfoBean fuelInfoBean6 = new FuelInfoBean(
                "Africa",
                77,
                22,
                536.53,
                0,
                57,
                211,
                "../images/flags/World.png"
        );

        FuelInfoBean fuelInfoBean7 = new FuelInfoBean(
                "Africa",
                14,
                56,
                536.53,
                0,
                57,
                211,
                "../images/flags/World.png"
        );

        FuelInfoBean fuelInfoBean8 = new FuelInfoBean(
                "Africa",
                22,
                78,
                536.53,
                0,
                57,
                211,
                "../images/flags/World.png"
        );

        FuelInfoBean fuelInfoBean9 = new FuelInfoBean(
                "Africa",
                0,
                11,
                536.53,
                0,
                57,
                211,
                "../images/flags/World.png"
        );

        FuelInfoBean fuelInfoBean10 = new FuelInfoBean(
                "Africa",
                19,
                25,
                536.53,
                0,
                57,
                211,
                "../images/flags/World.png"
        );

        infoList.add(fuelInfoBean1);
        infoList.add(fuelInfoBean2);
        infoList.add(fuelInfoBean3);
        infoList.add(fuelInfoBean4);
        infoList.add(fuelInfoBean5);
        infoList.add(fuelInfoBean6);
        infoList.add(fuelInfoBean7);
        infoList.add(fuelInfoBean8);
        infoList.add(fuelInfoBean9);
        infoList.add(fuelInfoBean10);

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
