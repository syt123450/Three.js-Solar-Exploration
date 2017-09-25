package com.nullpointerexception.presenter;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.nullpointerexception.model.Service.FuelDataService;
import com.nullpointerexception.model.bean.FuelInfo;
import com.nullpointerexception.model.bean.YearRequestBean;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

/**
 * Created by ss on 2017/9/20.
 */

@EnableAutoConfiguration
@RestController
@RequestMapping("/api")
public class Presenter {

    @Autowired
    private FuelDataService fuelDataService;
    private Gson gson = new GsonBuilder().create();
    private Logger logger = Logger.getLogger(Presenter.class);

    @RequestMapping(value = "/year", method = RequestMethod.POST)
    private String getTopCountryData(@RequestBody String body) {

        logger.info("Get request for year data.");
        YearRequestBean yearRequestBean = gson.fromJson(body, YearRequestBean.class);
        List<FuelInfo> infoList = fuelDataService.getData(yearRequestBean.getYear());

        return gson.toJson(infoList);
    }
}
