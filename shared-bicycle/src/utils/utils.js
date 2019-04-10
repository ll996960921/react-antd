
export default {

    //格式化时间
    formateDate(time){
        if(!time) return "";
        let date    = new Date(time);
        // return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },

    //调用百度天气API
    weatherURL(city){
        return 'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2';
    },

    //封装分页
    pagination(data, callback){
        // console.log(data);
        
        let page = {
            onChange: (current) => {
                callback(current)      
            },
            current: data.result.current, //当前页数
            pageSize: data.result.page_size, //每页显示数量
            total: data.result.total_count,  //总数
            showTotal: ()=>{ //显示数据总量和当前数据顺序
                return `总共 ${data.result.total_count} 条数据`
            },
            showQuickJumper: true //快速跳转到某页
        };
        return page;
    }
    
}