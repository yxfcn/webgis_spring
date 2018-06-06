/**
 * Copyright (C), 2018-2018, yf
 * FileName: DepartmentService
 * Author:  yxf
 * Date:     2018/4/27 19:03
 * Description:
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.yxf.springboot.yxf.business.services;

import com.yxf.springboot.yxf.business.entities.Department;

import java.util.List;

/**
 * 〈一句话功能简述〉<br> 
 * 〈〉
 *
 * @author yxf
 * @create 2018/4/27
 * @since 1.0.0
 */
public interface DepartmentService {
    public int deleteDep(Long id);
    public int addDep(Department department);
    public List<Department> getDepByPid(Long pid);
    public List<Department> getAllDeps();
}
