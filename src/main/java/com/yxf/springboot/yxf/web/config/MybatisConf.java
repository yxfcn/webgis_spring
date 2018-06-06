/**
 * Copyright (C), 2018-2018, yf
 * FileName: MybatisConf
 * Author:  yxf
 * Date:     2018/4/26 14:56
 * Description:
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.yxf.springboot.yxf.web.config;

import com.github.pagehelper.PageHelper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;

/**
 * 〈注册MyBatis分页插件PageHelper  〉<br>
 * 〈〉
 *
 * @author yxf
 * @create 2018/4/26
 * @since 1.0.0
 */
@Configuration
public class MybatisConf {
    @Bean
    public PageHelper pageHelper(){
        PageHelper pageHelper=new PageHelper();
        Properties p=new Properties();

        p.setProperty("offsetAsPageNum", "true");
        p.setProperty("rowBoundsWithCount", "true");
        p.setProperty("reasonable", "true");
        pageHelper.setProperties(p);
        return pageHelper;
    }
}
