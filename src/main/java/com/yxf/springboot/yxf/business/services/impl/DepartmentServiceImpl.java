/**
 * Copyright (C), 2018-2018, yf
 * FileName: DepartmentServiceImpl
 * Author:  yxf
 * Date:     2018/4/27 19:04
 * Description:
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.yxf.springboot.yxf.business.services.impl;

import com.yxf.springboot.yxf.business.entities.Department;
import com.yxf.springboot.yxf.business.mapper.DepartmentMapper;
import com.yxf.springboot.yxf.business.services.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * 〈一句话功能简述〉<br> 
 * 〈〉
 *
 * @author yxf
 * @create 2018/4/27
 * @since 1.0.0
 */
@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    DepartmentMapper departmentMapper;
    public int addDep(Department department) {
        department.setEnabled(true);
        departmentMapper.addDep(department);
        return department.getResult();
    }

    public int deleteDep(Long did) {
        Department department = new Department();
        department.setId(did);
        departmentMapper.deleteDep(department);
        return department.getResult();
    }

    public List<Department> getDepByPid(Long pid) {
        return departmentMapper.getDepByPid(pid);
    }

    public List<Department> getAllDeps() {
        return departmentMapper.getAllDeps();
    }
}
