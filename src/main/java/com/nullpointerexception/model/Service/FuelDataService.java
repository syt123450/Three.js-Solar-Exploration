package com.nullpointerexception.model.Service;

import com.nullpointerexception.model.bean.FuelInfo;

import java.util.List;

/**
 * Created by ss on 2017/9/23.
 */
public interface FuelDataService {

    List<FuelInfo> getData(int year);
}
