package com.yxf.springboot.yxf;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.yxf.springboot.yxf.business.mapper")
public class YxfApplication {

    public static void main(String[] args) {
        SpringApplication.run(YxfApplication.class, args);
    }
}
