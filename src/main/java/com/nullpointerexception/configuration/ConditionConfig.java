package com.nullpointerexception.configuration;

import com.nullpointerexception.model.mock.DevDemo;
import com.nullpointerexception.model.mock.MockDemo;
import com.nullpointerexception.model.mock.DemoInterface;
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
    public DemoInterface devInterface() {
        return new DevDemo();
    }

    @Bean
    @Profile("mock")
    public DemoInterface mockInterface() {
        return new MockDemo();
    }
}
