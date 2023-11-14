import axios from 'axios';
import React, { useCallback, useEffect, useState } from "react";
import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, limit, or, orderBy, query, updateDoc, where } from "firebase/firestore"
// const express = require('express');
const my_api_key = 'Bearer illi499949920047751515151'
export async function ordersuc_post(orders){//주문조회
  try{
    const respose = await axios.post('https://staging-api-interlocker.gorelas.com/api/delivery-possible',
    {
      "orderAgencyId": "illi_test",//제휴사 아이디
      "orderAgencyStoreId": 'OW00000000',//상점 아이디
      "dropRoadAddress": orders.pickup_doro,//도로명주소
      "dropJibunAddress": orders.pickup_siban,//지번주소
      "dropAddressDetail": orders.pickup_detail,//상세주소
      "pickupWishAt": orders.pickup_time,//픽업희망일시(timestamp)
      "totalPayPrice": orders.totalpay,//총 결제 금액
      "actualPayPrice": orders.realpay,//실제 결제 금액
      "prepaidPrice": 0,//선결제 금액
      "paymentCashPrice": 0,//후불 현금 결제금액
      "paymentCardPrice": 0,//후불 카드 결제 금액
      "isUntact": true,//비대면 배달 여부
      "isReservation": false//예약 주문 여부
    },
    {
      headers:{
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZVc2VySWQiOjExNzcsImFwaUtleUlkIjozMjExLCJyb2xlIjoib3JkZXJBZ2VuY3lNYW5hZ2VyIiwib3JkZXJBZ2VuY3lJZHMiOlsiaWxsaV90ZXN0Il0sImlhdCI6MTY5OTkwMTQ1MywiZXhwIjoxODU3NTgxNDUzfQ.uYmDLTfwNFerp5VPF0wOi8U0OWXmYrnQMk-Xv_oUKJ4'
      }
    });
    console.log(respose);
    return respose;
  }catch(e){
    console.error(e);
    console.log(e);
  }
}
export async function postOrder(orderInfo){//주문 접수
    let today = new Date().getTime();
    let pickday = today + (90 * 60 * 1000);
    let dropday = today + (150 * 60 * 1000);

    try{
        const response = await axios.post('https://staging-api-interlocker.gorelas.com/api/orders',{
            "baseType": '인천시 부평구 영성동로 18번길 19',//주소(add to add)
            "orderType": "FOR_DELIVERY",//연동형태(FOR_DELIVERY)
            "orderAgencyId": "illi_test",//주문 제휴사 아이디s
            "orderAgencyOrderId": 'TEST_00000123',//주문 제휴사 주문 아이디
            "orderAgencyDailyOrderId": "101",//주문 제휴사 당일 주문 아이디
            "totalPayPrice": 67000, //총 결제 금액
            "actualPayPrice": 50000,//실제 결제 금액
            "prepaidPrice": 0,//선결제 금액
            "prepaidMethod": "CARD",//선결제 수단
            "paymentCashPrice": 0,//후불 현금 결제 금액
            "paymentCardPrice": 0,//후불 카드 결제 금액
            "taxFreePayPrice": 0,//일회용 컵 반환 보증금 후불 결제 금액 (default: 0)
            "orderProducts": [
              {
                "type": 'flower',//상품 유형 (배달팁도 하나의 상품으로 취급 = DELIVERY_TIP)
                "name": '장미10송이',//상품 이름
                "totalPrice": 60000,//상품 총 금액 (상품 금액과 해당 상품에 포함된 옵션 금액의 합계 금액)
                "unitPrice": 60000,//상품 단가
                "quantity": 1,//상품 수량
                "options": [//옵션 상품 목록
                  {
                    "group": '포장',//옵션 종류
                    "name": '꽃 다발',//옵션 이름
                    "unitPrice": 5000,//옵션 단가
                    "quantity": 1//옵션 수량
                  }
                ]
              },
              {
                "type": "DELIVERY_TIP",
                "name": "배달팁",
                "totalPrice": 2000,
                "unitPrice": 2000,
                "quantity": 1
              }
            ],
            "ordererPhone": '01041689819',//주문자(고객) 연락처
            "receiverPhone": '01041689819',//수령자(고객) 연락처
            "ordererName": '김현진',//주문자(고객) 이름
            "receiverName": '김현진',//수령자(고객) 이름
            "ordererOrderMemo": '안전하게 와주세요',//상점의 요청 사항(배달대행사에게 전달)
            "orderChannel": "ETC",//주문 유입 채널
            "isReservation": false,//예약 주문 여부
            "dropWishAt": dropday,//드랍 희망 일시 (timestamp) [ 현재시간으로부터 90분 이후 .. 2개월 이내
            "reservedOrderDisplayTime": null,//라이더앱 노출 시간 (분)* dropWishAt 기준으로 라이더에게 주문이 몇 분 전에 노출되어야 하는지 입력받는 시간(분)입니다.
            "pickupWishAt": pickday,//픽업 희망 일시 (timestamp)
            //실시간 배달(isReservation false)인 경우 - 픽업희망일시(pickupWishAt)는 현재시간 + 90분 이내를 허용
            //예약 배달(isReservation true)인 경우 - dropWishAt - 라이더앱 노출시간 < pickupWishAt < dropWishAt – 20분
            "hasAlcoholicBeverage": false,
            "isUntact": true,//비대면 배달 여부
            "pickupId": 'test_001',//픽업지 식별 아이디
            "pickupName": '일리',//픽업지 이름 (설명)
            "pickupPhone": '01041689819',//픽업지 연락처
            "pickupRoadAddress": '서울특별시 노원구 공릉동 동일로174길 27',//픽업 도로명 주소
            "pickupJibunAddress": '',//픽업 지번 주소 (법정동)
            "pickupAddressDetail": '2층 203호',//픽업 상세 주소
            "dropRoadAddress": '인천시 부평구 영성동로 18번길 19',//드랍 도로명 주소
            "dropJibunAddress": '',//드랍 지번 주소 (법정동)
            "dropAddressDetail": '105동 301호',//드랍 상세 주소
            "bundleDeliveryCount": 1,//묶음 배달 건수 (값이 없을 시 제한 없음)
            "orderAgencyOrderCreatedAt": today//주문 제휴사에서 관리하는 실제 주문자(고객)의 주문 접수 일시 (timestamp)
        },{
          headers:{
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZVc2VySWQiOjExNzcsImFwaUtleUlkIjozMjExLCJyb2xlIjoib3JkZXJBZ2VuY3lNYW5hZ2VyIiwib3JkZXJBZ2VuY3lJZHMiOlsiaWxsaV90ZXN0Il0sImlhdCI6MTY5OTkwMTQ1MywiZXhwIjoxODU3NTgxNDUzfQ.uYmDLTfwNFerp5VPF0wOi8U0OWXmYrnQMk-Xv_oUKJ4'
        }
      });
        console.log(response);
        return response;
    }catch (e){
        console.error(e);
    }
};
export async function order_cancel(orderInfo){
  const cancelTypes = 'ETC'
  if(orderInfo.canceltype == '1'){//다른배달사 이용
    cancelTypes = 'OTHER_DELIVERY_AGENCY'
  }else if(orderInfo.canceltype == '2'){//중복 주문
    cancelTypes = 'DUPLICATE_ORDER'
  }else if(orderInfo.canceltype == '3'){//상정요청
    cancelTypes = 'CANCEL_BY_STORE'
  }else if(orderInfo.canceltype == '4'){//고객 요청
    cancelTypes = 'CANCEL_BY_CUSTOMER'
  }else if(orderInfo.canceltype == '5'){//관리자 권한
    cancelTypes = 'CANCEL_BY_ADMIN'
  }else if(orderInfo.canceltype == '6'){//고객 불만
    cancelTypes = 'COMPLAIN_BY_CUSTOMER'
  }else if(orderInfo.canceltype == '7'){//주문 수락 시간 초과
    cancelTypes = 'CANCEL_BY_TIMEOUT'
  }else if(orderInfo.canceltype == '8'){//배달 지연
    cancelTypes = 'DELAY_DELIVERY'
  }else if(orderInfo.canceltype == '9'){//불피요한 주문으로 판단
    cancelTypes = 'UNNECESSARY_ORDER'
  }else{//기타사유
    cancelTypes = 'ETC'
  }
  try{
    const response = await axios.put('https://staging-api-interlocker.gorelas.com/api/orders/{'+orderInfo.orderid+'}/status/cancel',
    {
      "time": orderInfo.canceltime,
      "cancelType": cancelTypes,
      "cancelReason": orderInfo.cancelreason
    },{
      headers : {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZVc2VySWQiOjExNzcsImFwaUtleUlkIjozMjExLCJyb2xlIjoib3JkZXJBZ2VuY3lNYW5hZ2VyIiwib3JkZXJBZ2VuY3lJZHMiOlsiaWxsaV90ZXN0Il0sImlhdCI6MTY5OTkwMTQ1MywiZXhwIjoxODU3NTgxNDUzfQ.uYmDLTfwNFerp5VPF0wOi8U0OWXmYrnQMk-Xv_oUKJ4'
      }
    })
    console.log(response);
    return response;
  }catch(e){
    console.error(e);
    console.log(e);
  }
};


// const app = express();
// const port = 3001;
// app.use(express.json());
// app.use(express.urlencoded({ extended:true }));

// app.post('/api/barogo/order/status', (req,res)=>{//주문상태변경 바로고 > 플릿
//   const customHeader = req.headers['Authorization'];
//   if(!customHeader || customHeader !== my_api_key){
//     return res.status(404).json({ error: 'not found'})
//   }
//   const requestData = req.body;
//   console.log(requestData);
//   res.status(200).json({ message: 'suc', data: requestData })
// });
// app.listen(port, () =>{
//   console.log('barogo_server_ active ${port}');
// });

// app.post('/api/barogo/delivery/pickup-expected-at', (req,res)=>{//배달정보 바로고 > 플릿
//   const customHeader = req.headers['Authorization'];
//   if(!customHeader || customHeader !== my_api_key){
//     return res.status(404).json({ error: 'not found'})
//   }
//   const requestData = req.body;
//   console.log(requestData);
//   res.status(200).json({ message: 'suc', data: requestData }) 
// });

// app.post('/api/barogo/order/accept', (req,res)=>{// 주문 수락 바로고 > 플릿
//   const customHeader = req.headers['Authorization'];
//   if(!customHeader || customHeader !== my_api_key){
//     return res.status(404).json({ error: 'not found'})
//   }
//   const requestData = req.body;
//   console.log(requestData);
//   res.status(200).json({ message: 'suc', data: requestData }) 
// });

// app.post('/api/barogo/order/reject', (req,res)=>{//주문 거절 바로고 > 플릿
//   const customHeader = req.headers['Authorization'];
//   if(!customHeader || customHeader !== my_api_key){
//     return res.status(404).json({ error: 'not found'})
//   }
//   const requestData = req.body;
//   console.log(requestData);
//   res.status(200).json({ message: 'suc', data: requestData }) 
// });