/**
 * Copyright (C), 2018-2018, yf
 * FileName: Department
 * Author:  yxf
 * Date:     2018/4/27 18:51
 * Description:
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.yxf.springboot.yxf.business.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
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
public class Department implements Serializable {
    private Long id;
    private String name;
    private Long parentId;
    private  String depPath;
    private boolean enabled;
    private boolean isParent;
    private List<Department> children;
    public Department(){

    }
    public Department(String name){this.name=name;}

    @Override
    public boolean equals(Object o){
        if(this==o)
            return true;
        if(o==null||getClass()!=o.getClass())
            return false;
        Department that=(Department) o;
        return name != null ? name.equals(that.name) : that.name == null;
    }
    @Override
    public int hashCode() {
        return name != null ? name.hashCode() : 0;
    }
    //存储过程执行结果
    private Integer result;


    public List<Department> getChildren() {
        return children;
    }
    public void setChildren(ArrayList<Department> children) {
        this.children = children;
    }

    @JsonIgnore
    public Integer getResult() {
        return result;
    }

    public void setResult(Integer result) {
        this.result = result;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    @JsonIgnore
    public String getDepPath() {
        return depPath;
    }

    public void setDepPath(String depPath) {
        this.depPath = depPath;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isParent() {
        return isParent;
    }

    public void setParent(boolean parent) {
        isParent = parent;
    }
}
