package com.nullpointerexception.configuration;

import com.nullpointerexception.model.service.FuelDataService;
import com.nullpointerexception.model.dev.DevDemo;
import com.nullpointerexception.model.dev.FuelDataImpl;
import com.nullpointerexception.model.mock.MockDemo;
import com.nullpointerexception.model.service.DemoService;
import com.nullpointerexception.model.mock.MockFuelDataService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Created by ss on 2017/9/20.
 */

@Configuration
public class ConditionConfig {

    @Bean
    @Profile("dev")
    public DemoService devService() {
        return new DevDemo();
    }

    @Bean
    @Profile("mock")
    public DemoService mockService() {
        return new MockDemo();
    }

    @Bean
    @Profile("dev")
    public FuelDataService devFuelDataService() {
        return new FuelDataImpl();
    }

    @Bean
    @Profile("mock")
    public FuelDataService mockFuelDataService() {
        return new MockFuelDataService();
    }
}
