package com.nullpointerexception.model.mock;

/**
 * Created by ss on 2017/9/21.
 */
public class MockDemo implements DemoInterface {

    @Override
    public void sayHello() {
        System.out.println("Mock Hello.");
    }
}
