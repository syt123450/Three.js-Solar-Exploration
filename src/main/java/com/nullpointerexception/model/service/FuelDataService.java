package com.nullpointerexception.model.service;

import com.nullpointerexception.model.bean.FuelInfoBean;

import java.util.List;

/**
 * Created by ss on 2017/9/23.
 */
public interface FuelDataService {

    List<FuelInfoBean> getYearlyData(int year);
    List<Double> getAllData();
}
