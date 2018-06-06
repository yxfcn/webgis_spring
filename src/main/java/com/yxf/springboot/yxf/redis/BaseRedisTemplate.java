/**
 * Copyright (C), 2018-2018, yf
 * FileName: BaseRedisTemplate
 * Author:  yxf
 * Date:     2018/4/26 15:17
 * Description:
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.yxf.springboot.yxf.redis;

import org.springframework.data.redis.connection.DefaultStringRedisConnection;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.lang.reflect.ParameterizedType;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * 〈创建redis操作模板 方便后期业务调用Redis数据〉<br>
 * 〈〉
 *
 * @author yxf
 * @create 2018/4/26
 * @since 1.0.0
 */
public abstract class BaseRedisTemplate<HV> extends RedisTemplate<String, HV> {

    private Class<HV> hvClass;

    private String dbname;

    @SuppressWarnings("unchecked")
    private Class<HV> getHVClass() {
        if (hvClass == null) {
            hvClass = (Class<HV>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
            dbname = hvClass.getName() + "_";
        }
        return hvClass;
    }

    /**
     * Constructs a new <code>StringRedisTemplate</code> instance ready to be
     * used.
     *
     * @param connectionFactory
     *            connection factory for creating new connections
     */
    public BaseRedisTemplate(RedisConnectionFactory connectionFactory) {
        if (getHVClass() == null) {
            throw new IllegalArgumentException("获取泛型class失败");
        }
        RedisSerializer<String> stringSerializer = new StringRedisSerializer();
        setKeySerializer(stringSerializer);
        setValueSerializer(new Jackson2JsonRedisSerializer<HV>(getHVClass()));
        setHashKeySerializer(stringSerializer);
        setHashValueSerializer(new Jackson2JsonRedisSerializer<HV>(getHVClass()));
        setConnectionFactory(connectionFactory);
        afterPropertiesSet();
    }

    protected RedisConnection preProcessConnection(RedisConnection connection, boolean existingConnection) {
        return new DefaultStringRedisConnection(connection);
    }

    /**
     * map存放操作
     *
     * @param table
     * @param key
     * @param hv
     */
    protected void putMap(String table, String key, HV hv) {
        this.opsForHash().put(getTable(table), key, hv);
    }

    /**
     * map取操作
     *
     * @param table
     * @param key
     * @return
     */
    @SuppressWarnings("unchecked")
    protected HV getMap(String table, String key) {
        return (HV) this.opsForHash().get(getTable(table), key);
    }

    protected void set(String key, HV hv) {
        this.opsForValue().set(getTable(key), hv);
    }

    protected HV get(String key) {
        HV hv = this.opsForValue().get(getTable(key));
        return hv;
    }

    @SuppressWarnings("unchecked")
    protected Map<String,HV> entriesMap(String key){
        Map<Object, Object> entries = this.opsForHash().entries(getTable(key));
        Map<String,HV> entriesMap = new HashMap<String,HV>();
        Iterator<Object> iterator = entries.keySet().iterator();
        while(iterator.hasNext()){
            Object next = iterator.next();
            String mapKey = (String)next;
            HV hv = (HV)entries.get(next);
            entriesMap.put(mapKey, hv);
        }
        return entriesMap;
    }

    protected long removeMapKey(String table,Object... keys){
        return this.opsForHash().delete(getTable(table), keys);
    }

    protected long removeMapKeyByStringKey(String key1,String key2){
        return this.opsForHash().delete(key1, key2);
    }

    protected void putAllMap(String table,Map<String,HV> map){
        this.opsForHash().putAll(getTable(table), map);
    }

    protected long leftPush(String key, HV hv) {
        return this.opsForList().leftPush(getTable(key), hv);
    }

    protected long rightPush(String key, HV hv) {
        return this.opsForList().rightPush(getTable(key), hv);
    }

    protected HV leftPop(String key) {
        return this.opsForList().leftPop(getTable(key));
    }

    protected HV rightPop(String key) {
        return this.opsForList().rightPop(getTable(key));
    }

    /**
     * 中心轴左侧插入
     *
     * @param key
     * @param pivot
     *            中心轴的值, 左侧插入
     * @param value
     */
    protected long leftPush(String key, HV pivot, HV value) {
        return this.opsForList().leftPush(getTable(key), pivot, value);
    }

    /**
     * 中心轴右侧插入
     *
     * @param key
     * @param pivot
     *            中心轴的值, 左侧插入
     * @param value
     */
    protected long rightPush(String key, HV pivot, HV value) {
        return this.opsForList().rightPush(getTable(key), pivot, value);
    }

    /**
     * 有序列表 在某个索引值下直接覆盖值
     *
     * @param key
     * @param index
     * @param value
     */
    protected void setList(String key, long index, HV value) {
        this.opsForList().set(getTable(key), index, value);
    }

    /**
     * 获取列表中的地index个索引的值
     *
     * @param key
     * @param index
     * @return
     */
    protected HV indexList(String key, long index) {
        return this.opsForList().index(getTable(key), index);
    }

    /**
     * 列表总长度
     *
     * @param key
     * @return
     */
    protected long sizeList(String key) {
        return this.opsForList().size(getTable(key));
    }

    /**
     * Removes the first count occurrences of elements equal to value from the
     * list stored at key. The count argument influences the operation in the
     * following ways:
     * count > 0: Remove elements equal to value moving from
     * head to tail.
     * count < 0: Remove elements equal to value moving from tail
     * to head. count = 0:
     * Remove all elements equal to value. For example, LREM
     * list -2 "hello" will remove the last two occurrences of "hello" in the
     * list stored at list. Note that non-existing keys are treated like empty
     * lists, so when key does not exist, the command will always return 0.
     *
     * @param key
     * @param count
     * @param hv
     * @return
     */
    protected long removeList(String key, long count, HV hv) {
        return this.opsForList().remove(getTable(key), count, hv);
    }

    protected long addSet(String key, HV[] values){
        return this.opsForSet().add(getTable(key), values);
    }

    protected Set<HV> membersSet(String key){
        Set<HV> members = this.opsForSet().members(getTable(key));
        return members;
    }

    protected long sizeSet(String key){
        return this.opsForSet().size(getTable(key));
    }

    protected boolean isMemberSet(String key,HV hv){
        return this.opsForSet().isMember(getTable(key), hv);
    }

    protected long removeSet(String key,HV[] values){
        return this.opsForSet().remove(getTable(key), values);
    }
    /**
     * 取一个，少一个
     * @param key
     * @return
     */
    protected HV popSet(String key){
        return this.opsForSet().pop(getTable(key));
    }

    protected Set<HV> distinctRandomMembersSet(String key, long distinctCount){
        return this.opsForSet().distinctRandomMembers(getTable(key), distinctCount);
    }

    private String getTable(String table) {
        return dbname + table;
    }

}
