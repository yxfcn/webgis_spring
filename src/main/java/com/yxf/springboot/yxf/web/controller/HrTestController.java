/**
 * Copyright (C), 2018-2018, yf
 * FileName: HrTestController
 * Author:  yxf
 * Date:     2018/4/27 13:10
 * Description:
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.yxf.springboot.yxf.web.controller;

import com.yxf.springboot.yxf.business.entities.Department;
import com.yxf.springboot.yxf.business.services.DepartmentService;
import com.yxf.springboot.yxf.business.services.HrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 〈一句话功能简述〉<br> 
 * 〈〉
 *
 * @author yxf
 * @create 2018/4/27
 * @since 1.0.0
 */
@RestController
public class HrTestController {
    @Autowired
    private HrService hrService;
    @Autowired
    private DepartmentService departmentService;

    @RequestMapping(value="/gethr/{pid}",method = RequestMethod.GET)
    public List<Department> getHr(@PathVariable Long pid) {

       // Hr hr = hrService.getHrById(new Long(10));
        String out = "";
        List<Department> children = departmentService.getDepByPid(pid);
//     for(Department department :children){
//        out=out+department.getId()+"\n";
//     }
//        if(hr==null)
//            return "nothing";
//        else{
//        return out+hr.getName();}
//
//    }
        return children;
    }
}
