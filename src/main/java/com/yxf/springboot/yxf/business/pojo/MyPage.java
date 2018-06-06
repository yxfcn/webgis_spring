/**
 * Copyright (C), 2018-2018, yf
 * FileName: MyPage
 * Author:  yxf
 * Date:     2018/4/26 14:58
 * Description:
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.yxf.springboot.yxf.business.pojo;

import com.github.pagehelper.Page;

import java.util.List;

/**
 * 〈一句话功能简述〉<br> 
 * 〈〉
 *
 * @author yxf
 * @create 2018/4/26
 * @since 1.0.0
 */
public class MyPage <T>{
    public MyPage(){

    }
    public MyPage(Page<T> page) {
        int pageNum = page.getPageNum();
        int pageSize = page.getPageSize();
        long total = page.getTotal();
        int pages = page.getPages();
        this.pageNo = pageNum;
        this.pageSize = pageSize;
        this.total = total;
        this.totalPage = pages;
        this.list = page.getResult();
    }

    private int pageNo;

    private int pageSize;

    private long total;

    private int totalPage;

    private List<T> list;

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

}
