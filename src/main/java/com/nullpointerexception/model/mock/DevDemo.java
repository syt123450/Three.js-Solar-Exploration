package com.nullpointerexception.model.mock;

import com.nullpointerexception.model.utils.MySQLUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

/**
 * Created by ss on 2017/9/21.
 */

public class DevDemo implements DemoInterface {

    @Override
    public void sayHello() {
        System.out.println("Dev Hello.");
    }
}
