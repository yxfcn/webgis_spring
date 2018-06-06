/**
 * Copyright (C), 2018-2018, yf
 * FileName: HomeController
 * Author:  yxf
 * Date:     2018/4/25 12:59
 * Description:
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.yxf.springboot.yxf.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 〈一句话功能简述〉<br> 
 * 〈〉
 *
 * @author yxf
 * @create 2018/4/25
 * @since 1.0.0
 */
@Controller
public class HomeController {


    @RequestMapping("/")
    public String Index(){
        return "templates/home/index.html";
    }

    @RequestMapping("/template")
    public String Templates(){
        return "templates/template.html";
    }
    @RequestMapping("/tdt")
    public String TDTTest(){
        return "templates/tdt/tdt.html";
    }



}
