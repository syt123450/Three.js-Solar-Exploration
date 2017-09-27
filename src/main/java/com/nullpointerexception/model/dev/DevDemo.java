package com.nullpointerexception.model.dev;

import com.nullpointerexception.model.service.DemoService;

/**
 * Created by ss on 2017/9/21.
 */

public class DevDemo implements DemoService {

    @Override
    public void sayHello() {
        System.out.println("Dev Hello.");
    }
}
