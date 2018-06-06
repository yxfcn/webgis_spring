/**
 * Copyright (C), 2018-2018, yf
 * FileName: WebConfig
 * Author:  yxf
 * Date:     2018/5/3 17:23
 * Description:
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.yxf.springboot.yxf.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
/**
 * 〈一句话功能简述〉<br> 
 * 〈〉
 *
 * @author yxf
 * @create 2018/5/3
 * @since 1.0.0
 */
@Configuration
public class WebConfig extends WebMvcConfigurationSupport {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("static/**").addResourceLocations("classpath:/static/");
        registry.addResourceHandler("public/**").addResourceLocations("classpath:/public/");
        registry.addResourceHandler("templates/**").addResourceLocations("classpath:/templates/");
        registry.addResourceHandler("node_modules/**").addResourceLocations("classpath:/node_modules/");
        registry.addResourceHandler("mybatis/**").addResourceLocations("classpath:/mybatis/");
    }


}
