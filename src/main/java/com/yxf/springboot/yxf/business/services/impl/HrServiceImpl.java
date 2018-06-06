/**
 * Copyright (C), 2018-2018, yf
 * FileName: HrServiceImpl
 * Author:  yxf
 * Date:     2018/4/27 13:08
 * Description:
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.yxf.springboot.yxf.business.services.impl;

import com.yxf.springboot.yxf.business.entities.Hr;
import com.yxf.springboot.yxf.business.mapper.HrMapper;
import com.yxf.springboot.yxf.business.services.HrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 〈一句话功能简述〉<br> 
 * 〈〉
 *
 * @author yxf
 * @create 2018/4/27
 * @since 1.0.0
 */
@Service
public class HrServiceImpl implements HrService {
    @Autowired
    private HrMapper hrMapper;

    @Override
    public Hr getHrById(Long hrId) {
        return hrMapper.getHrById(hrId);
    }
}
