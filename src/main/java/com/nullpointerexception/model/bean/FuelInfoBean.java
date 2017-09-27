package com.nullpointerexception.model.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Created by ss on 2017/9/25.
 */

@Data
@AllArgsConstructor
public class FuelInfoBean {

    private String countryName;
    private double longitude;
    private double latitude;
    private double amount;
}
