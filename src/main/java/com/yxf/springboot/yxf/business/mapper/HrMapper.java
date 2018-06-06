package com.yxf.springboot.yxf.business.mapper;

import com.yxf.springboot.yxf.business.entities.Hr;
import org.apache.ibatis.annotations.Mapper;

/**
 * Created by sang on 2017/12/28.
 */
@Mapper
public interface HrMapper {
     Hr getHrById(Long hrId);

}
