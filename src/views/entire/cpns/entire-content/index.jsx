import RoomItem from "@/components/room-item";
import React, { memo, useState, useEffect, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import _ from 'lodash'

import { setDetailInfoAction } from '@/store';

import { ContentStyle } from "./style";

const EntireContent = memo(() => {

  const [itemWidth, setItemWidth] = useState(() => {
    const screenWidth = document.documentElement.clientWidth

    if (screenWidth > 1200) {
      return '20%'
    } else if (screenWidth > 992) {
      return '25%'
    } else if (screenWidth > 768) {
      return '33.3%'
    } else {
      return '50%'
    }
  })

  useEffect(() => {

    const handleScreenChange = _.throttle(() => {
      const screenWidth = document.documentElement.clientWidth

      if (screenWidth > 1200) {
        setItemWidth('20%')
      } else if (screenWidth > 992) {
        setItemWidth('25%')
      } else if (screenWidth > 768) {
        setItemWidth('33.3%')
      } else {
        setItemWidth('50%')
      }
    }, 300)

    window.addEventListener("resize", handleScreenChange)

    return () => {
      window.removeEventListener("resize", handleScreenChange)
    }

  }, [])

  const { totalCount, dataList, isLoading } = useSelector(state => ({
    totalCount: state.entire.totalCount,
    dataList: state.entire.dataList,
    isLoading: state.entire.isLoading
  }), shallowEqual)

  const roomClick = (item) => {
    console.log('房子点击：', item);
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleItemClick = useCallback((item) => {
    console.log('房子的详情数据：', item);

    dispatch(setDetailInfoAction(item))

    navigate('/detail')

  }, [navigate, dispatch])

  return (
    <ContentStyle>
      { !!totalCount && <h2 className="title">共{totalCount}处住所</h2> }
      <div className="entire-content">
        {
          dataList.map((item, index) => {
            return (
              <RoomItem 
                roomItem={item} 
                itemWidth={itemWidth} 
                itemClick={handleItemClick}
                key={item._id}
                onClick={() => roomClick(item)}
              />
            )
          })
        }
      </div>
      {/* 蒙版 */}
      { isLoading && <div className="cover"></div> }
    </ContentStyle>
  );
});

export default EntireContent;
