/**
 * Copyright (C), 2018-2018, yf
 * FileName: DepartmentMapper
 * Author:  yxf
 * Date:     2018/4/27 18:57
 * Description:
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */

package com.yxf.springboot.yxf.business.mapper;

import com.yxf.springboot.yxf.business.entities.Department;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 〈一句话功能简述〉<br> 
 * 〈〉
 *
 * @author yxf
 * @create 2018/4/27
 * @since 1.0.0
 */
public interface DepartmentMapper {
    void addDep(@Param("dep") Department department);

    void deleteDep(@Param("dep") Department department);

    List<Department> getDepByPid(Long pid);

    List<Department> getAllDeps();

}
