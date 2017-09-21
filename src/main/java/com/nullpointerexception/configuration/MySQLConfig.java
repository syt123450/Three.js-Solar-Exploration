package com.nullpointerexception.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * Created by ss on 2017/9/21.
 */

@Data
@Component
@EnableConfigurationProperties
@PropertySource("classpath:database.properties")
@ConfigurationProperties(prefix = "MySQL")
public class MySQLConfig {

    private String URL;
    private String UserName;
    private String Password;
}
