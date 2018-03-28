import React from 'react';
import { Tag } from 'antd';
import locale from 'locale';

const Status = ({ description, color }) => <Tag color={color}>{description}</Tag>
const HkPaymentStatus = ({status}) =>{
    const ps = locale.getCategory('payment_status');
    const description = ps.find(x => x.code === status).description;
    switch (status){
        case 'WAITING':
            return <Status description={description} color="orange"/>
        case 'PAID':
            return <Status description={description} color="blue"/>
        case 'DELAYED':
            return <Status description={description} color="red" />
        default:
            return <Status description={description} color="cyan" />
    }

}
export default HkPaymentStatus;