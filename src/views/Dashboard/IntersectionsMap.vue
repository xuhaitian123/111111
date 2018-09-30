<template>
  <div>
    <area-select></area-select>
    <el-row :gutter="10" class="Dashboard_lineRow">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span><i class="el-icon-arrow-left" style="margin-right: 10px" @click="jumpPage('/main/dashboard')"></i>交叉口数据</span>
            <div style="float: right; padding: 3px 0">
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="" style="position: relative;background: #1f1f2c">
            <div style="width: 65%;height: 720px;position: relative;overflow: hidden;">
              <img class="animated " src="/static/image/map/node_map_cross.png" id="node_animated"
                   style="height: 100%;width: 100%"/>

              <div id="node_animated_float">
                <div style="position: absolute;top: 35%;width: 96%;z-index: 10;font-size: 16px;left: 2%">
                  <div style="float: left">{{allLinksName[currentDirection[1]]}}</div>
                  <div style="float: right">{{allLinksName[currentDirection[3]]}}</div>
                </div>

                <div style="position: absolute;bottom: 10px;z-index: 10;font-size: 16px;left: 30%">
                  <div>{{allLinksName[currentDirection[0]]}}</div>
                </div>

                <div v-if="currentTabs === '0'">
                  <div v-if="allMovementFlow[currentDirection[0]]">
                    <div class="signal_node_info" style="left: 445px">
                      <b>{{allMovementFlow[currentDirection[0]]['左'].total.toFixed(0)}}</b>
                    </div>
                    <div class="signal_node_info" style="left: 550px">
                      <b>{{allMovementFlow[currentDirection[0]]['直'].total.toFixed(0)}}</b>
                    </div>
                    <div class="signal_node_info" style="left: 640px">
                      <b>{{allMovementFlow[currentDirection[0]]['右'].total.toFixed(0)}}</b>
                    </div>


                    <div style="position: absolute;bottom: 0;">
                      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                           width="565px" height="485px" viewBox="0 0 2419.000000 2065.000000"
                           preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,2065.000000) scale(0.100000,-0.100000)"
                           :fill="getSaturationColor(allMovementFlow[currentDirection[0]]['左'].total)"
                           opacity="0.5" stroke="none">
                          <path d="M19120 20646 c-5 -4 -7878 -22 -14962 -32 l-4158 -6 0 -804 0 -804
9450 0 c6627 0 9480 -3 9548 -11 396 -43 836 -193 1165 -397 902 -557 1252
-1565 1021 -2936 -204 -1213 -1810 -7294 -3895 -14742 -137 -490 -249 -896
-249 -903 0 -8 639 -11 2470 -11 1359 0 2470 2 2470 4 0 2 492 3707 1094 8233
602 4525 1099 8289 1105 8362 14 171 14 613 1 796 -100 1365 -663 2367 -1610
2864 -363 190 -733 299 -1250 368 -108 14 -267 17 -1160 20 -570 2 -1038 2
-1040 -1z"/>
                        </g>
                      </svg>
                    </div>

                    <div style="position: absolute;bottom: 0;left: 47%;">
                      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                           width="150px" height="720px" viewBox="0 0 411.200000 2400.000000"
                           preserveAspectRatio="xMidYMid meet">
                        <metadata>
                          Created by potrace 1.13, written by Peter Selinger 2001-2015
                        </metadata>
                        <g transform="translate(0.000000,2400.000000) scale(0.080000,-0.080000)"
                           :fill="getSaturationColor(allMovementFlow[currentDirection[0]]['直'].total)"
                           opacity="0.5" stroke="none">
                          <path d="M1992 15007 c-1096 -8245 -1993 -14995 -1993 -14999 1 -5 1101 -8
2446 -8 2322 0 2445 1 2445 18 0 9 56 3522 124 7807 l124 7790 -159 7120 c-87
3916 -159 7153 -159 7193 l0 72 -417 0 -418 0 -1993 -14993z"/>
                        </g>
                      </svg>

                    </div>

                    <div style="position: absolute;bottom: 0;right: 0">
                      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                           width="435px" height="400px" viewBox="0 0 1486.400000 1376.800000"
                           preserveAspectRatio="xMidYMid meet">
                        <metadata>
                          Created by potrace 1.13, written by Peter Selinger 2001-2015
                        </metadata>
                        <g transform="translate(0.000000,1376.800000) scale(0.080000,-0.080000)"
                           :fill="getSaturationColor(allMovementFlow[currentDirection[0]]['右'].total)"
                           opacity="0.5" stroke="none">
                          <path d="M10120 17185 c-6966 -26 -6975 -26 -7145 -49 -539 -74 -920 -184
-1320 -381 -775 -381 -1240 -991 -1385 -1818 -19 -106 -26 -497 -145 -7507
-69 -4067 -125 -7403 -125 -7412 0 -17 115 -18 2286 -18 l2286 0 -6 33 c-10
57 -340 2193 -515 3342 -735 4800 -1177 7858 -1310 9050 -67 596 -77 1210 -26
1598 128 972 625 1449 1595 1527 75 6 2460 -5 6780 -30 3666 -22 6851 -40
7078 -40 l412 0 0 273 c0 149 -3 539 -7 865 l-6 592 -1126 -1 c-619 -1 -3914
-12 -7321 -24z"/>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>

                <div v-if="currentTabs === '1'">
                  <div v-if="allMovementDelay[currentDirection[0]]">
                    <div class="signal_node_info" style="left: 445px">
                      <b>{{allMovementDelay[currentDirection[0]]['左'].toFixed(0)}}s</b>
                    </div>
                    <div class="signal_node_info" style="left: 550px">
                      <b>{{allMovementDelay[currentDirection[0]]['直'].toFixed(0)}}s</b>
                    </div>
                    <div class="signal_node_info" style="left: 640px">
                      <b>{{allMovementDelay[currentDirection[0]]['右'].toFixed(0)}}s</b>
                    </div>


                    <div style="position: absolute;bottom: 0;">
                      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                           width="565px" height="485px" viewBox="0 0 2419.000000 2065.000000"
                           preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,2065.000000) scale(0.100000,-0.100000)"
                           :fill="getSaturationColor(allMovementDelay[currentDirection[0]]['左'])" opacity="0.5"
                           stroke="none">
                          <path d="M19120 20646 c-5 -4 -7878 -22 -14962 -32 l-4158 -6 0 -804 0 -804
9450 0 c6627 0 9480 -3 9548 -11 396 -43 836 -193 1165 -397 902 -557 1252
-1565 1021 -2936 -204 -1213 -1810 -7294 -3895 -14742 -137 -490 -249 -896
-249 -903 0 -8 639 -11 2470 -11 1359 0 2470 2 2470 4 0 2 492 3707 1094 8233
602 4525 1099 8289 1105 8362 14 171 14 613 1 796 -100 1365 -663 2367 -1610
2864 -363 190 -733 299 -1250 368 -108 14 -267 17 -1160 20 -570 2 -1038 2
-1040 -1z"/>
                        </g>
                      </svg>
                    </div>

                    <div style="position: absolute;bottom: 0;left: 47%;">
                      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                           width="150px" height="720px" viewBox="0 0 411.200000 2400.000000"
                           preserveAspectRatio="xMidYMid meet">
                        <metadata>
                          Created by potrace 1.13, written by Peter Selinger 2001-2015
                        </metadata>
                        <g transform="translate(0.000000,2400.000000) scale(0.080000,-0.080000)"
                           :fill="getSaturationColor(allMovementDelay[currentDirection[0]]['直'])" opacity="0.5"
                           stroke="none">
                          <path d="M1992 15007 c-1096 -8245 -1993 -14995 -1993 -14999 1 -5 1101 -8
2446 -8 2322 0 2445 1 2445 18 0 9 56 3522 124 7807 l124 7790 -159 7120 c-87
3916 -159 7153 -159 7193 l0 72 -417 0 -418 0 -1993 -14993z"/>
                        </g>
                      </svg>

                    </div>

                    <div style="position: absolute;bottom: 0;right: 0">
                      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                           width="435px" height="400px" viewBox="0 0 1486.400000 1376.800000"
                           preserveAspectRatio="xMidYMid meet">
                        <metadata>
                          Created by potrace 1.13, written by Peter Selinger 2001-2015
                        </metadata>
                        <g transform="translate(0.000000,1376.800000) scale(0.080000,-0.080000)"
                           :fill="getSaturationColor(allMovementDelay[currentDirection[0]]['右'])" opacity="0.5"
                           stroke="none">
                          <path d="M10120 17185 c-6966 -26 -6975 -26 -7145 -49 -539 -74 -920 -184
-1320 -381 -775 -381 -1240 -991 -1385 -1818 -19 -106 -26 -497 -145 -7507
-69 -4067 -125 -7403 -125 -7412 0 -17 115 -18 2286 -18 l2286 0 -6 33 c-10
57 -340 2193 -515 3342 -735 4800 -1177 7858 -1310 9050 -67 596 -77 1210 -26
1598 128 972 625 1449 1595 1527 75 6 2460 -5 6780 -30 3666 -22 6851 -40
7078 -40 l412 0 0 273 c0 149 -3 539 -7 865 l-6 592 -1126 -1 c-619 -1 -3914
-12 -7321 -24z"/>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div @click="rotateNode(270)"
                   style="position: absolute;width: 300px;height: 175px;left: 0;top: 28%;z-index: 11"></div>
              <div @click="rotateNode(90)"
                   style="position: absolute;width: 350px;height: 175px;right: 35%;top: 28%;z-index: 11"></div>
              <div @click="rotateNode(180)"
                   style="position: absolute;width: 250px;height: 175px;top: 20px;z-index: 11;left: 26%"></div>
            </div>

            <div style="position: absolute;bottom: 10px;left: 38%">单位： {{currentTabs==='0'?'pcu':'s'}}</div>

            <div class="signal_left_block"
                 style="top: 50px;height: 60px;font-size: 23px;text-align: center;color: #c9c9cc;">
              <div style="padding-top: 3px">{{currentDirectionLetter[currentDirection[0]]}}</div>
              <i class="iconfont icon-fangxiang" style="font-size: 22px"></i>
            </div>

            <div class="signal_left_block"
                 style="top: 120px;height: 120px;">

              <img src="/static/image/map/40.png"
                   style="width: 50px;height: 50px;padding: 5px;border-bottom: 1px solid #acacaf"/>
              <img src="/static/image/map/camera.png" @click="jumpPage('/main/trafficVideo/'+$route.params.id)"
                   style="width: 30px;height: 30px;padding: 12px;"/>
            </div>

            <div class="Road_row_link">
              <el-row type="flex" justify="space-around">
                <el-col :span="5">
                  <div class="fs14">交叉口 <span>{{nodeData.node.node_name}}</span></div>
                </el-col>
                <el-col :span="5">
                  <div class="fs14">总流量 <span>{{nodeData.flow}}vph</span></div>
                </el-col>
                <el-col :span="8">
                  <div class="fs14" style="display: flex">
                    交叉口拥堵水平
                    <ul style="line-height: 30px;margin-left: 30px">
                      <li>
                        <div class="Road_border" :style="{border: nodeData.value <30 ? '1px solid green' :'0' }">
                          <div class="Road_circle"
                               style="background: green;"></div>
                        </div>
                        <div class="Road_border"
                             :style="{border: nodeData.value <50&&nodeData.value >30 ? '1px solid #e7c936' :'0' }">
                          <div class="Road_circle"
                               style="background: #e7c936;"></div>
                        </div>
                        <div class="Road_border"
                             :style="{border: nodeData.value <60&&nodeData.value >50 ? '1px solid darkorange' :'0' }">
                          <div class="Road_circle"
                               style="background: darkorange;"></div>
                        </div>
                        <div class="Road_border" :style="{border: nodeData.value >60 ? '1px solid red' :'0' }">
                          <div class="Road_circle"
                               style="background: red;"></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="signal_road_score">
              <div style="font-size: 14px;margin-top: 10px">交叉口交通运行评分</div>
              <road-gauge :data="roadNetCongestionScore.toFixed(0)" :color="getSaturationColor(roadNetCongestionScore)" class="Dashboard_card_roadGauge"></road-gauge>
            </div>

            <!--<div>-->
            <!--<div-->
            <!--style="position: absolute;bottom: 200px;width: 250px;height: 40px;background: #1f1f2c;border-radius: 10px;left: 28%">-->
            <!--<div style="width: 50%;float: left;">-->
            <!--<div style="height: 20px;width: 70%;margin: 10px auto;border-radius: 10px"-->
            <!--:style="{background : currentColor['d5']==='green'?'green':'yellow'}"></div>-->
            <!--</div>-->
            <!--<div style="width: 50%;float: left;">-->
            <!--<div style="height: 20px;width: 70%;margin: 10px auto;border-radius: 10px"-->
            <!--:style="{background : currentColor['d2']==='green'?'green':'yellow'}"></div>-->
            <!--</div>-->
            <!--</div>-->

            <!--<div-->
            <!--style="position: absolute;top: 130px;width: 150px;height: 30px;background: #1f1f2c;border-radius: 10px;left: 26%">-->
            <!--<div style="width: 50%;float: left;">-->
            <!--<div style="height: 15px;width: 70%;margin: 7.5px auto;background: red;border-radius: 10px"></div>-->
            <!--</div>-->
            <!--<div style="width: 50%;float: left;">-->
            <!--<div style="height: 15px;width: 70%;margin: 7.5px auto;background: red;border-radius: 10px"></div>-->
            <!--</div>-->
            <!--</div>-->

            <!--<div-->
            <!--style="position: absolute;top: 38%;width: 30px;height: 100px;background: #1f1f2c;border-radius: 10px;left: 9%;transform: rotate(44deg);">-->
            <!--<div style="width: 75%;margin: auto">-->
            <!--<div style="height: 40px;width: 70%;    margin:5px auto;background: red;border-radius: 10px"></div>-->
            <!--</div>-->
            <!--<div style="width: 75%;margin: auto">-->
            <!--<div style="height: 40px;width: 70%;    margin:5px auto;background: red;border-radius: 10px"></div>-->
            <!--</div>-->
            <!--</div>-->

            <!--<div-->
            <!--style="position: absolute;top: 28%;width: 30px;height: 100px;background: #1f1f2c;border-radius: 10px;right: 49%;transform: rotate(-20deg);">-->
            <!--<div style="width: 75%;margin: auto">-->
            <!--<div style="height: 40px;width: 70%;    margin:5px auto;background: red;border-radius: 10px"></div>-->
            <!--</div>-->
            <!--<div style="width: 75%;margin: auto">-->
            <!--<div style="height: 40px;width: 70%;    margin:5px auto;background: red;border-radius: 10px"></div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->

            <div class="Node_right">
              <el-tabs type="border-card" style="height: 400px;background: #353644">
                <el-tab-pane label="当前信号灯配时方案" v-loading="loadingSignal"
                             element-loading-background="rgba(0, 0, 0, 0.8)">
                  <el-row style="padding: 40px 20px 0;text-align: center">
                    <el-col :span="3" v-for="(value,index) in currentSignal" :key="index">
                      <div class="" style="margin-bottom: 5px">{{signalText[value.key]}}</div>
                      <div style="height: 86px;border-radius: 10px;width: 30px;background: #2a2b36;margin: auto">
                        <ul class="Node_signal_lamp">
                          <li :style="{background : !currentColor[value.key] ? 'red':''}"></li>
                          <li
                            :style="{background : currentColor[value.key]==='yellow'? 'yellow':''}"></li>
                          <li :style="{background : currentColor[value.key]==='green'?'green':''}"></li>
                        </ul>
                      </div>
                    </el-col>
                  </el-row>
                  <div style="margin: 80px 20px 0;">
                    <div @mousemove="changeSignalLine" @mouseup='stopChange' @mouseleave="stopChange"
                         style="border-bottom: 1px solid #c9c9cc;border-top: 1px solid #c9c9cc;font-size: 12px;padding: 0 5px 20px;position: relative">
                      <div class="signal_current_line" id="signal_line" @mousedown="moveSignalLine"
                           :style="{left: lineLeft+'px'}"></div>
                      <el-row>
                        <el-col :span="24" id="allWidth">
                          <div v-if="signalPlan['111']!==undefined">
                            <div>
                              <div style="float: left;" id="width111"
                                   :style="{width: ((signalPlan['111'].MaxGreen+signalPlan['111'].Yellow)/ signalPlan.first)*100+'%'}">
                                {{getRoadFlow(signalPlan['111'].key)}}
                              </div>
                              <div style="float: left;" id="width112"
                                   :style="{width: ((signalPlan['112'].MaxGreen+signalPlan['112'].Yellow)/ signalPlan.first)*100+'%'}">
                                {{getRoadFlow(signalPlan['112'].key)}}
                              </div>
                              <div style="float: left;" id="width121"
                                   :style="{width: ((signalPlan['121'].MaxGreen+signalPlan['121'].Yellow)/ signalPlan.first)*100+'%'}">
                                {{getRoadFlow(signalPlan['121'].key)}}
                              </div>
                              <div style="float: left;" id="width122"
                                   :style="{width: ((signalPlan['122'].MaxGreen+signalPlan['122'].Yellow)/ signalPlan.first)*100+'%'}">
                                {{getRoadFlow(signalPlan['122'].key)}}
                              </div>
                            </div>

                            <div id="111_red"
                                 :style="{width: (signalPlan['111'].MaxGreen/ signalPlan.first)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['111'].MaxGreen}}s
                            </div>
                            <div id="111_yellow"
                                 :style="{width: (signalPlan['111'].Yellow / signalPlan.first)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['111'].AllRed / signalPlan.first)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>

                          <div v-if="signalPlan['112']!==undefined">

                            <div id="112_red"
                                 :style="{width: (signalPlan['112'].MaxGreen/ signalPlan.first)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['112'].MaxGreen}}s
                            </div>
                            <div id="112_yellow"
                                 :style="{width: (signalPlan['112'].Yellow / signalPlan.first)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['112'].AllRed / signalPlan.first)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>

                          <div v-if="signalPlan['121']!==undefined">

                            <div id="121_red"
                                 :style="{width: (signalPlan['121'].MaxGreen/ signalPlan.first)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['121'].MaxGreen}}s
                            </div>
                            <div id="121_yellow"
                                 :style="{width: (signalPlan['121'].Yellow / signalPlan.first)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['121'].AllRed / signalPlan.first)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>

                          <div v-if="signalPlan['122']!==undefined">

                            <div id="122_red"
                                 :style="{width: (signalPlan['122'].MaxGreen/ signalPlan.first)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['122'].MaxGreen}}s
                            </div>
                            <div id="122_yellow"
                                 :style="{width: (signalPlan['122'].Yellow / signalPlan.first)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['122'].AllRed / signalPlan.first)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="24">
                          <div v-if="signalPlan['211']!==undefined">
                            <div>
                              <div style="float: left;" id="width211"
                                   :style="{width: ((signalPlan['211'].MaxGreen+signalPlan['211'].Yellow)/ signalPlan.second)*100+'%'}">
                                {{getRoadFlow(signalPlan['211'].key)}}
                              </div>
                              <div style="float: left;" id="width212"
                                   :style="{width: ((signalPlan['212'].MaxGreen+signalPlan['212'].Yellow)/ signalPlan.second)*100+'%'}">
                                {{getRoadFlow(signalPlan['212'].key)}}
                              </div>
                              <div style="float: left;" id="width221"
                                   :style="{width: ((signalPlan['221'].MaxGreen+signalPlan['221'].Yellow)/ signalPlan.second)*100+'%'}">
                                {{getRoadFlow(signalPlan['221'].key)}}
                              </div>
                              <div style="float: left;" id="width222"
                                   :style="{width: ((signalPlan['222'].MaxGreen+signalPlan['222'].Yellow)/ signalPlan.second)*100+'%'}">
                                {{getRoadFlow(signalPlan['222'].key)}}
                              </div>

                            </div>

                            <div id="211_red"
                                 :style="{width: (signalPlan['211'].MaxGreen/ signalPlan.second)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['211'].MaxGreen}}s
                            </div>
                            <div id="211_yellow"
                                 :style="{width: (signalPlan['211'].Yellow / signalPlan.second)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['211'].AllRed / signalPlan.second)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>

                          <div v-if="signalPlan['212']!==undefined">

                            <div id="212_red"
                                 :style="{width: (signalPlan['212'].MaxGreen/ signalPlan.second)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['212'].MaxGreen}}s
                            </div>
                            <div id="212_yellow"
                                 :style="{width: (signalPlan['212'].Yellow / signalPlan.second)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['212'].AllRed / signalPlan.second)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>

                          <div v-if="signalPlan['221']!==undefined">

                            <div id="221_red"
                                 :style="{width: (signalPlan['221'].MaxGreen/ signalPlan.second)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['221'].MaxGreen}}s
                            </div>
                            <div id="221_yellow"
                                 :style="{width: (signalPlan['221'].Yellow / signalPlan.second)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['221'].AllRed / signalPlan.second)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>

                          <div v-if="signalPlan['222']!==undefined">

                            <div id="222_red"
                                 :style="{width: (signalPlan['222'].MaxGreen/ signalPlan.second)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['222'].MaxGreen}}s
                            </div>
                            <div id="222_yellow"
                                 :style="{width: (signalPlan['222'].Yellow / signalPlan.second)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['222'].AllRed / signalPlan.second)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="交叉口饱和度/排队长度数据展示" v-loading="loadingLength"
                             element-loading-background="rgba(0, 0, 0, 0.8)">
                  <el-row>
                    <el-col :span="6" style="padding: 20px 10px ">
                      <div class="Node_row_list">
                        <div class="Node_row_list_title">排队长度 / 米</div>
                        <ul class="">
                          <li>0-12 <span>--</span></li>
                          <li>12-25 <span>--</span></li>
                          <li>25-37 <span>--</span></li>
                          <li>>50 <span>--</span></li>
                        </ul>

                        <div style="padding: 10px 15px;color: #c9c9cc">
                          <div style="text-align: left;font-size: 12px">
                            饱和度
                          </div>
                          <div class="Node_div_list">
                            <div style="background: #c94343;height: 10px;width: 15px;float: left;margin-top: 4px"></div>
                            <div style="font-size: 12px;">已饱和</div>
                          </div>
                          <div class="Node_div_list">
                            <div style="background: #f98d21;height: 10px;width: 15px;float: left;margin-top: 4px"></div>
                            <div style="font-size: 12px;">50 - 75%</div>
                          </div>
                          <div class="Node_div_list">
                            <div style="background: #eacc36;height: 10px;width: 15px;float: left;margin-top: 4px"></div>
                            <div style="font-size: 12px;">25 - 50%</div>
                          </div>
                          <div class="Node_div_list">
                            <div style="background: green;height: 10px;width: 15px;float: left;margin-top: 4px"></div>
                            <div style="font-size: 12px;">< 25%</div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="2" style="padding-top: 170px;font-size: 12px">
                      西
                      <div style="padding-top: 20px"> →</div>
                    </el-col>
                    <el-col :span="14">
                      <div style="font-size: 12px;padding-left: 38%;">↓ {{allLinksName['北']}}</div>
                      <div style="display: flex;flex-wrap: wrap;">
                        <div class="block" style="text-align: center">
                          <div style="padding-top: 50%;letter-spacing: 10px"><span>></span> <span>25</span>
                            <span>12</span> <span>0</span>
                          </div>
                          <div style="letter-spacing: 10px"> | | | |</div>
                        </div>
                        <div class="block"
                             style="border-left: 3px solid #c9c9cc;border-right: 3px solid #c9c9cc;position:relative;">
                          <div v-if="nodeLength.values[3]"
                               :style="{height: nodeLength.values[3].value+'px',background: getSaturationColor((nodeLength.values[3].value / 50)*100)}"
                               style="width: 100%;position: absolute;bottom: 0"></div>
                        </div>
                        <div class="block">
                          <div class="Node_length_list Node_length_list_right">
                            <ul class="">
                              <li><span>--</span>>50</li>
                              <li><span>--</span>25-37</li>
                              <li><span>--</span>12-25</li>
                              <li><span>--</span>0-12</li>
                            </ul>
                          </div>
                        </div>
                        <div class="block" style="border-top: 3px solid #c9c9cc;border-bottom: 3px solid #c9c9cc">
                          <div v-if="nodeLength.values[2]"
                               :style="{width: nodeLength.values[2].value+'px',background: getSaturationColor((nodeLength.values[2].value/50)*100)}"
                               style="height: 100%;float: right"></div>
                        </div>
                        <div class="block" style="border: 3px solid #c9c9cc;"></div>
                        <div class="block" style="border-top: 3px solid #c9c9cc;border-bottom: 3px solid #c9c9cc">
                          <div v-if="nodeLength.values[0]"
                               :style="{width: nodeLength.values[0].value+'px',background: getSaturationColor((nodeLength.values[0].value/50)*100)}"
                               style="height: 100%;"></div>
                        </div>
                        <div class="block">
                          <div class="Node_length_list Node_length_list_left" style="text-align: right">
                            <ul class="">
                              <li>0-12 <span>--</span></li>
                              <li>12-25 <span>--</span></li>
                              <li>25-37 <span>--</span></li>
                              <li>>50 <span>--</span></li>
                            </ul>
                          </div>
                        </div>
                        <div class="block" style="border-left: 3px solid #c9c9cc;border-right: 3px solid #c9c9cc">
                          <div v-if="nodeLength.values[1]"
                               :style="{height: nodeLength.values[1].value+'px',background: getSaturationColor((nodeLength.values[1].value/ 50) * 100)}"
                               style="width: 100%;"></div>
                        </div>
                        <div class="block" style="padding-left: 15px">
                          <div style="letter-spacing: 10px"> | | | |</div>
                          <div style="letter-spacing: 10px"><span>0</span> <span>12</span> <span>25</span>
                            <span> > </span></div>
                        </div>
                        <div style="font-size: 12px;padding-left: 38%;">{{allLinksName['南']}} ↑</div>
                      </div>
                    </el-col>
                    <el-col :span="2" style="font-size: 12px">
                      <div style="font-size: 16px">N</div>
                      <div style="padding-top: 130px;padding-bottom: 20px"> ←</div>
                      东
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>

              <el-tabs type="border-card" :before-leave="setFlowOrDelay" v-loading="loadingFlow"
                       element-loading-background="rgba(0, 0, 0, 0.8)"
                       class="Node_right_bottom">
                <el-tab-pane label="交叉口机动车/非机动车流量">
                  <el-row style="position: relative">
                    <el-col :span="11" style="display: flex;position: relative">
                      <div style="width: 20px;font-size: 12px;padding-top: 80px;margin-right: 10px"
                           v-if="allLinksName['西']">
                        {{allLinksName['西'].split("").join("\n")}}
                      </div>

                      <div style="flex: 1;">
                        <div class="" style="margin-bottom: 20px">{{allLinksName['北']}}</div>

                        <div style="position: relative;" v-if="allMovementFlow['南']">
                          <div style="width: 100%;height: 180px;">

                            <div style="position: absolute;bottom: 0;"
                                 :style="{zIndex:currentDirection[0] === '南'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="111px" height="111px" viewBox="0 0 366.000000 373.000000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">

                                <g transform="translate(0.000000,373.000000) scale(0.100000,-0.100000)"
                                   :fill="getSaturationColor(allMovementFlow['南']['左'].car)"
                                   :opacity="currentDirection[0] === '南' ? '':'0.2'" stroke="none">
                                  <path d="M37 3684 c23 -27 63 -70 90 -96 l48 -48 1470 -2 c1378 -3 1474 -4
1530 -21 94 -28 160 -62 208 -107 84 -77 77 93 77 -1759 l0 -1651 100 0 100 0
-2 1678 -3 1677 -33 67 c-61 125 -177 216 -341 269 l-96 31 -1595 6 -1594 5
41 -49z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;left: 30px;z-index: 12">
                                {{allMovementFlow['南']['左'].car}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 69px"
                                 :style="{zIndex:currentDirection[0] === '南'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="7px" height="190px" viewBox="0 0 16.000000 495.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,495.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['南']['直'].car)"
                                   :opacity="currentDirection[0] === '南' ? '':'0.2'" stroke="none">
                                  <path d="M53 6148 l-41 -43 -8 -3052 -7 -3053 102 0 101 0 0 3052 0 3052 -42
43 c-23 24 -47 43 -53 43 -6 0 -29 -19 -52 -42z"/>
                                </g>
                              </svg>

                              <div
                                style="position: absolute;top: 30px;    transform: translateX(-30%) translateY(-0%) rotate(-90deg)">
                                {{allMovementFlow['南']['直'].car}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 0"
                                 :style="{zIndex:currentDirection[0] === '南'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="70px" height="70px" viewBox="0 0 173.600000 179.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,179.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['南']['右'].car)"
                                   :opacity="currentDirection[0] === '南' ? '':'0.2'" stroke="none">
                                  <path d="M310 2226 c-122 -34 -224 -116 -276 -221 l-29 -60 -3 -972 -2 -973
95 0 95 0 2 943 c3 855 5 945 20 972 25 46 68 86 118 109 44 21 56 21 855 24
l810 3 78 77 c43 42 83 85 88 95 9 16 -36 17 -898 16 -695 -1 -919 -4 -953
-13z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;right: 30px">
                                {{allMovementFlow['南']['右'].car}}
                              </div>
                            </div>
                          </div>

                          <div
                            style="width: 100%;height: 180px;position: absolute;top: -7px;transform: rotate(90deg);left: -7px">
                            <div style="position: absolute;bottom: 0;"
                                 :style="{zIndex:currentDirection[0] === '西'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="111px" height="111px" viewBox="0 0 366.000000 373.000000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">

                                <g transform="translate(0.000000,373.000000) scale(0.100000,-0.100000)"
                                   :fill="getSaturationColor(allMovementFlow['西']['左'].car)"
                                   :opacity="currentDirection[0] === '西' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M37 3684 c23 -27 63 -70 90 -96 l48 -48 1470 -2 c1378 -3 1474 -4
1530 -21 94 -28 160 -62 208 -107 84 -77 77 93 77 -1759 l0 -1651 100 0 100 0
-2 1678 -3 1677 -33 67 c-61 125 -177 216 -341 269 l-96 31 -1595 6 -1594 5
41 -49z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;left: 30px;z-index: 12">
                                {{allMovementFlow['西']['左'].car}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 69px"
                                 :style="{zIndex:currentDirection[0] === '西'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="7px" height="190px" viewBox="0 0 16.000000 495.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,495.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['西']['直'].car)"
                                   :opacity="currentDirection[0] === '西' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M53 6148 l-41 -43 -8 -3052 -7 -3053 102 0 101 0 0 3052 0 3052 -42
43 c-23 24 -47 43 -53 43 -6 0 -29 -19 -52 -42z"/>
                                </g>
                              </svg>

                              <div
                                style="position: absolute;top: 30px;    transform: translateX(-30%) translateY(-0%) rotate(-90deg)">
                                {{allMovementFlow['西']['直'].car}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 0"
                                 :style="{zIndex:currentDirection[0] === '西'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="70px" height="70px" viewBox="0 0 173.600000 179.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,179.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['西']['右'].car)"
                                   :opacity="currentDirection[0] === '西' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M310 2226 c-122 -34 -224 -116 -276 -221 l-29 -60 -3 -972 -2 -973
95 0 95 0 2 943 c3 855 5 945 20 972 25 46 68 86 118 109 44 21 56 21 855 24
l810 3 78 77 c43 42 83 85 88 95 9 16 -36 17 -898 16 -695 -1 -919 -4 -953
-13z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;right: 30px">
                                {{allMovementFlow['西']['右'].car}}
                              </div>
                            </div>
                          </div>

                          <div
                            style="width: 100%;height: 180px;position: absolute;top: -14px;transform: rotate(180deg);">
                            <div style="position: absolute;bottom: 0;"
                                 :style="{zIndex:currentDirection[0] === '北'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="111px" height="111px" viewBox="0 0 366.000000 373.000000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">

                                <g transform="translate(0.000000,373.000000) scale(0.100000,-0.100000)"
                                   :fill="getSaturationColor(allMovementFlow['北']['左'].car)"
                                   :opacity="currentDirection[0] === '北' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M37 3684 c23 -27 63 -70 90 -96 l48 -48 1470 -2 c1378 -3 1474 -4
1530 -21 94 -28 160 -62 208 -107 84 -77 77 93 77 -1759 l0 -1651 100 0 100 0
-2 1678 -3 1677 -33 67 c-61 125 -177 216 -341 269 l-96 31 -1595 6 -1594 5
41 -49z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;left: 30px;z-index: 12">
                                {{allMovementFlow['北']['左'].car}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 69px"
                                 :style="{zIndex:currentDirection[0] === '北'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="7px" height="190px" viewBox="0 0 16.000000 495.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,495.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['北']['直'].car)"
                                   :opacity="currentDirection[0] === '北' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M53 6148 l-41 -43 -8 -3052 -7 -3053 102 0 101 0 0 3052 0 3052 -42
43 c-23 24 -47 43 -53 43 -6 0 -29 -19 -52 -42z"/>
                                </g>
                              </svg>

                              <div
                                style="position: absolute;top: 30px;    transform: translateX(-30%) translateY(-0%) rotate(-90deg)">
                                {{allMovementFlow['北']['直'].car}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 0"
                                 :style="{zIndex:currentDirection[0] === '北'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="70px" height="70px" viewBox="0 0 173.600000 179.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,179.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['北']['右'].car)"
                                   :opacity="currentDirection[0] === '北' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M310 2226 c-122 -34 -224 -116 -276 -221 l-29 -60 -3 -972 -2 -973
95 0 95 0 2 943 c3 855 5 945 20 972 25 46 68 86 118 109 44 21 56 21 855 24
l810 3 78 77 c43 42 83 85 88 95 9 16 -36 17 -898 16 -695 -1 -919 -4 -953
-13z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;right: 30px">
                                {{allMovementFlow['北']['右'].car}}
                              </div>
                            </div>
                          </div>

                          <div
                            style="width: 100%;height: 180px;position: absolute;top: -7px;transform: rotate(270deg);left: 8px">
                            <div style="position: absolute;bottom: 0;"
                                 :style="{zIndex:currentDirection[0] === '东'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="111px" height="111px" viewBox="0 0 366.000000 373.000000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">

                                <g transform="translate(0.000000,373.000000) scale(0.100000,-0.100000)"
                                   :fill="getSaturationColor(allMovementFlow['东']['左'].car)"
                                   :opacity="currentDirection[0] === '东' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M37 3684 c23 -27 63 -70 90 -96 l48 -48 1470 -2 c1378 -3 1474 -4
1530 -21 94 -28 160 -62 208 -107 84 -77 77 93 77 -1759 l0 -1651 100 0 100 0
-2 1678 -3 1677 -33 67 c-61 125 -177 216 -341 269 l-96 31 -1595 6 -1594 5
41 -49z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;left: 30px;z-index: 12">
                                {{allMovementFlow['东']['左'].car}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 69px"
                                 :style="{zIndex:currentDirection[0] === '东'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="7px" height="190px" viewBox="0 0 16.000000 495.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,495.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['东']['直'].car)"
                                   :opacity="currentDirection[0] === '东' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M53 6148 l-41 -43 -8 -3052 -7 -3053 102 0 101 0 0 3052 0 3052 -42
43 c-23 24 -47 43 -53 43 -6 0 -29 -19 -52 -42z"/>
                                </g>
                              </svg>

                              <div
                                style="position: absolute;top: 30px;    transform: translateX(-30%) translateY(-0%) rotate(90deg)">
                                {{allMovementFlow['东']['直'].car}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 0"
                                 :style="{zIndex:currentDirection[0] === '东'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="70px" height="70px" viewBox="0 0 173.600000 179.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,179.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['东']['右'].car)"
                                   :opacity="currentDirection[0] === '东' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M310 2226 c-122 -34 -224 -116 -276 -221 l-29 -60 -3 -972 -2 -973
95 0 95 0 2 943 c3 855 5 945 20 972 25 46 68 86 118 109 44 21 56 21 855 24
l810 3 78 77 c43 42 83 85 88 95 9 16 -36 17 -898 16 -695 -1 -919 -4 -953
-13z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;right: 30px">
                                {{allMovementFlow['东']['右'].car}}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="" style="margin-top: 5px">{{allLinksName['南']}}</div>

                        <img src="/static/image/map/flow_car.png"
                             style="width: 110px;height: 20px;position: absolute;bottom: -25px;left: 0;right: 0;margin: auto;"/>

                      </div>

                      <div style="width: 20px;padding-top: 80px;font-size: 12px;padding-left: 12px"
                           v-if="allLinksName['东']">
                        {{allLinksName['东'].split("").join("\n")}}
                      </div>
                    </el-col>
                    <el-col :span="11" :offset="1" style="display: flex;position: relative" v-if="allLinksName['西']">
                      <div style="width: 20px;font-size: 12px;padding-top: 80px;margin-right: 10px"
                           v-if="allLinksName['西']">
                        {{allLinksName['西'].split("").join("\n")}}
                      </div>

                      <div style="flex: 1">
                        <div class="" style="margin-bottom: 20px">{{allLinksName['北']}}</div>

                        <div style="position: relative;" v-if="allMovementFlow['南']">
                          <div style="width: 100%;height: 180px;">

                            <div style="position: absolute;bottom: 0;"
                                 :style="{zIndex:currentDirection[0] === '南'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="111px" height="111px" viewBox="0 0 366.000000 373.000000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">

                                <g transform="translate(0.000000,373.000000) scale(0.100000,-0.100000)"
                                   :fill="getSaturationColor(allMovementFlow['南']['左'].car)"
                                   :opacity="currentDirection[0] === '南' ? '':'0.2'" stroke="none">
                                  <path d="M37 3684 c23 -27 63 -70 90 -96 l48 -48 1470 -2 c1378 -3 1474 -4
1530 -21 94 -28 160 -62 208 -107 84 -77 77 93 77 -1759 l0 -1651 100 0 100 0
-2 1678 -3 1677 -33 67 c-61 125 -177 216 -341 269 l-96 31 -1595 6 -1594 5
41 -49z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;left: 30px;z-index: 12">
                                {{allMovementFlow['南']['左'].bike}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 69px"
                                 :style="{zIndex:currentDirection[0] === '南'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="7px" height="190px" viewBox="0 0 16.000000 495.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,495.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['南']['直'].car)"
                                   :opacity="currentDirection[0] === '南' ? '':'0.2'" stroke="none">
                                  <path d="M53 6148 l-41 -43 -8 -3052 -7 -3053 102 0 101 0 0 3052 0 3052 -42
43 c-23 24 -47 43 -53 43 -6 0 -29 -19 -52 -42z"/>
                                </g>
                              </svg>

                              <div
                                style="position: absolute;top: 30px;    transform: translateX(-30%) translateY(-0%) rotate(-90deg)">
                                {{allMovementFlow['南']['直'].bike}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 0"
                                 :style="{zIndex:currentDirection[0] === '南'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="70px" height="70px" viewBox="0 0 173.600000 179.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,179.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['南']['右'].car)"
                                   :opacity="currentDirection[0] === '南' ? '':'0.2'" stroke="none">
                                  <path d="M310 2226 c-122 -34 -224 -116 -276 -221 l-29 -60 -3 -972 -2 -973
95 0 95 0 2 943 c3 855 5 945 20 972 25 46 68 86 118 109 44 21 56 21 855 24
l810 3 78 77 c43 42 83 85 88 95 9 16 -36 17 -898 16 -695 -1 -919 -4 -953
-13z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;right: 30px">
                                {{allMovementFlow['南']['右'].bike}}
                              </div>
                            </div>
                          </div>

                          <div
                            style="width: 100%;height: 180px;position: absolute;top: -7px;transform: rotate(90deg);left: -7px">
                            <div style="position: absolute;bottom: 0;"
                                 :style="{zIndex:currentDirection[0] === '西'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="111px" height="111px" viewBox="0 0 366.000000 373.000000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">

                                <g transform="translate(0.000000,373.000000) scale(0.100000,-0.100000)"
                                   :fill="getSaturationColor(allMovementFlow['西']['左'].bike)"
                                   :opacity="currentDirection[0] === '西' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M37 3684 c23 -27 63 -70 90 -96 l48 -48 1470 -2 c1378 -3 1474 -4
1530 -21 94 -28 160 -62 208 -107 84 -77 77 93 77 -1759 l0 -1651 100 0 100 0
-2 1678 -3 1677 -33 67 c-61 125 -177 216 -341 269 l-96 31 -1595 6 -1594 5
41 -49z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;left: 30px;z-index: 12">
                                {{allMovementFlow['西']['左'].bike}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 69px"
                                 :style="{zIndex:currentDirection[0] === '西'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="7px" height="190px" viewBox="0 0 16.000000 495.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,495.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['西']['直'].car)"
                                   :opacity="currentDirection[0] === '西' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M53 6148 l-41 -43 -8 -3052 -7 -3053 102 0 101 0 0 3052 0 3052 -42
43 c-23 24 -47 43 -53 43 -6 0 -29 -19 -52 -42z"/>
                                </g>
                              </svg>

                              <div
                                style="position: absolute;top: 30px;    transform: translateX(-30%) translateY(-0%) rotate(-90deg)">
                                {{allMovementFlow['西']['直'].bike}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 0"
                                 :style="{zIndex:currentDirection[0] === '西'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="70px" height="70px" viewBox="0 0 173.600000 179.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,179.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['西']['右'].car)"
                                   :opacity="currentDirection[0] === '西' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M310 2226 c-122 -34 -224 -116 -276 -221 l-29 -60 -3 -972 -2 -973
95 0 95 0 2 943 c3 855 5 945 20 972 25 46 68 86 118 109 44 21 56 21 855 24
l810 3 78 77 c43 42 83 85 88 95 9 16 -36 17 -898 16 -695 -1 -919 -4 -953
-13z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;right: 30px">
                                {{allMovementFlow['西']['右'].bike}}
                              </div>
                            </div>
                          </div>

                          <div
                            style="width: 100%;height: 180px;position: absolute;top: -14px;transform: rotate(180deg);">
                            <div style="position: absolute;bottom: 0;"
                                 :style="{zIndex:currentDirection[0] === '北'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="111px" height="111px" viewBox="0 0 366.000000 373.000000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">

                                <g transform="translate(0.000000,373.000000) scale(0.100000,-0.100000)"
                                   :fill="getSaturationColor(allMovementFlow['北']['左'].bike)"
                                   :opacity="currentDirection[0] === '北' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M37 3684 c23 -27 63 -70 90 -96 l48 -48 1470 -2 c1378 -3 1474 -4
1530 -21 94 -28 160 -62 208 -107 84 -77 77 93 77 -1759 l0 -1651 100 0 100 0
-2 1678 -3 1677 -33 67 c-61 125 -177 216 -341 269 l-96 31 -1595 6 -1594 5
41 -49z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;left: 30px;z-index: 12">
                                {{allMovementFlow['北']['左'].bike}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 69px"
                                 :style="{zIndex:currentDirection[0] === '北'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="7px" height="190px" viewBox="0 0 16.000000 495.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,495.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['北']['直'].car)"
                                   :opacity="currentDirection[0] === '北' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M53 6148 l-41 -43 -8 -3052 -7 -3053 102 0 101 0 0 3052 0 3052 -42
43 c-23 24 -47 43 -53 43 -6 0 -29 -19 -52 -42z"/>
                                </g>
                              </svg>

                              <div
                                style="position: absolute;top: 30px;    transform: translateX(-30%) translateY(-0%) rotate(-90deg)">
                                {{allMovementFlow['北']['直'].bike}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 0"
                                 :style="{zIndex:currentDirection[0] === '北'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="70px" height="70px" viewBox="0 0 173.600000 179.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,179.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['北']['右'].car)"
                                   :opacity="currentDirection[0] === '北' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M310 2226 c-122 -34 -224 -116 -276 -221 l-29 -60 -3 -972 -2 -973
95 0 95 0 2 943 c3 855 5 945 20 972 25 46 68 86 118 109 44 21 56 21 855 24
l810 3 78 77 c43 42 83 85 88 95 9 16 -36 17 -898 16 -695 -1 -919 -4 -953
-13z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;right: 30px">
                                {{allMovementFlow['北']['右'].bike}}
                              </div>
                            </div>
                          </div>

                          <div
                            style="width: 100%;height: 180px;position: absolute;top: -7px;transform: rotate(270deg);left: 8px">
                            <div style="position: absolute;bottom: 0;"
                                 :style="{zIndex:currentDirection[0] === '东'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="111px" height="111px" viewBox="0 0 366.000000 373.000000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">

                                <g transform="translate(0.000000,373.000000) scale(0.100000,-0.100000)"
                                   :fill="getSaturationColor(allMovementFlow['东']['左'].bike)"
                                   :opacity="currentDirection[0] === '东' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M37 3684 c23 -27 63 -70 90 -96 l48 -48 1470 -2 c1378 -3 1474 -4
1530 -21 94 -28 160 -62 208 -107 84 -77 77 93 77 -1759 l0 -1651 100 0 100 0
-2 1678 -3 1677 -33 67 c-61 125 -177 216 -341 269 l-96 31 -1595 6 -1594 5
41 -49z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;left: 30px;z-index: 12">
                                {{allMovementFlow['东']['左'].bike}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 69px"
                                 :style="{zIndex:currentDirection[0] === '东'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="7px" height="190px" viewBox="0 0 16.000000 495.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,495.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['东']['直'].car)"
                                   :opacity="currentDirection[0] === '东' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M53 6148 l-41 -43 -8 -3052 -7 -3053 102 0 101 0 0 3052 0 3052 -42
43 c-23 24 -47 43 -53 43 -6 0 -29 -19 -52 -42z"/>
                                </g>
                              </svg>

                              <div
                                style="position: absolute;top: 30px;    transform: translateX(-30%) translateY(-0%) rotate(90deg)">
                                {{allMovementFlow['东']['直'].bike}}
                              </div>
                            </div>
                            <div style="position: absolute;bottom: 0;right: 0"
                                 :style="{zIndex:currentDirection[0] === '东'?10:''}">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="70px" height="70px" viewBox="0 0 173.600000 179.200000"
                                   preserveAspectRatio="xMidYMid meet" position="relative">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,179.200000) scale(0.080000,-0.080000)"
                                   :fill="getSaturationColor(allMovementFlow['东']['右'].bike)"
                                   :opacity="currentDirection[0] === '东' ? '':'0.2'"
                                   stroke="none">
                                  <path d="M310 2226 c-122 -34 -224 -116 -276 -221 l-29 -60 -3 -972 -2 -973
95 0 95 0 2 943 c3 855 5 945 20 972 25 46 68 86 118 109 44 21 56 21 855 24
l810 3 78 77 c43 42 83 85 88 95 9 16 -36 17 -898 16 -695 -1 -919 -4 -953
-13z"/>
                                </g>
                              </svg>

                              <div style="position: absolute;top: -2px;right: 30px">
                                {{allMovementFlow['东']['右'].bike}}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="" style="margin-top: 5px">{{allLinksName['南']}}</div>

                        <img src="/static/image/map/flow_bike.png"
                             style="width: 110px;height: 20px;position: absolute;bottom: -25px;left: 0;right: 0;margin: auto;"/>
                      </div>

                      <div style="width: 20px;font-size: 12px;padding-top: 80px;padding-left: 12px"
                           v-if="allLinksName['东']">
                        {{allLinksName['东'].split("").join("\n")}}
                      </div>

                    </el-col>

                    <el-col :span="1">
                      <div class=""
                           style="font-size: 23px;text-align: center;color: #c9c9cc;">
                        <div style="padding-top: 3px">N</div>
                        <i class="iconfont icon-fangxiang" style="font-size: 22px"></i>
                      </div>
                    </el-col>

                    <div style="position: absolute;
    bottom: -12px;
    width: 75px;
    right: 0;">单位：{{currentTabs==='0'?'pcu':'s'}}
                    </div>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="交叉口延误数据" v-loading="loadingDelay" element-loading-background="rgba(0, 0, 0, 0.8)">
                  <el-row>
                    <el-col :span="12" :offset="2">
                      <div class="" style="display: flex">

                        <div style="width: 20px;line-height: 245px;font-size: 12px">西</div>

                        <div style="flex: 1;position: relative">
                          <div style="line-height: 30px;text-align: center;font-size: 12px"
                               v-if="allLinksName['北']">{{allLinksName['北']}}
                          </div>
                          <img src="/static/image/map/delay_cross.png"
                               style="width: 186px;height: 186px;display: block;margin: 0 auto"/>

                          <div v-if="allMovementDelay['东']"
                               style="position: absolute;top: 80px;right: 30px;transform: rotate(270deg);">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                 width="10px" height="25px" viewBox="0 0 40.800000 104.800000"
                                 preserveAspectRatio="xMidYMid meet">
                              <metadata>
                                Created by potrace 1.13, written by Peter Selinger 2001-2015
                              </metadata>
                              <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000)"
                                 :fill="getSaturationColor(allMovementDelay['东']['左'])" stroke="none">
                                <path d="M95 1256 c-49 -29 -91 -58 -92 -63 -5 -13 186 -125 198 -117 5 3 9
18 9 35 0 29 0 29 61 29 54 0 64 -3 88 -29 49 -53 51 -72 51 -610 l0 -501 45
0 46 0 -3 533 -3 532 -25 49 c-14 27 -43 63 -64 80 -34 28 -46 31 -117 35
l-79 3 0 39 c0 25 -4 39 -12 38 -7 0 -53 -24 -103 -53z"/>
                              </g>
                            </svg>

                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                 width="10px" height="25px" viewBox="0 0 21.600000 104.800000"
                                 preserveAspectRatio="xMidYMid meet">
                              <metadata>
                                Created by potrace 1.13, written by Peter Selinger 2001-2015
                              </metadata>
                              <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000) "
                                 :fill="getSaturationColor(allMovementDelay['东']['直'])" stroke="none">
                                <path d="M62 1200 c-34 -60 -62 -114 -62 -120 0 -5 20 -10 45 -10 l45 0 0
-535 0 -535 45 0 45 0 0 535 0 535 46 0 c32 0 44 4 42 13 -7 28 -124 227 -133
227 -5 0 -38 -50 -73 -110z"/>
                              </g>
                            </svg>

                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                 width="10px" height="25px" viewBox="0 0 40.800000 104.800000"
                                 preserveAspectRatio="xMidYMid meet">
                              <metadata>
                                Created by potrace 1.13, written by Peter Selinger 2001-2015
                              </metadata>
                              <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000)"
                                 :fill="getSaturationColor(allMovementDelay['东']['右'])" stroke="none">
                                <path d="M300 1271 l0 -39 -79 -3 c-71 -4 -83 -7 -117 -35 -21 -17 -50 -53
-64 -80 l-25 -49 -3 -532 -3 -533 46 0 45 0 0 501 c0 538 2 557 51 610 24 26
34 29 88 29 61 0 61 0 61 -29 0 -17 4 -32 9 -35 12 -8 203 104 198 117 -3 11
-183 117 -198 117 -5 0 -9 -18 -9 -39z"/>
                              </g>
                            </svg>
                          </div>

                          <div v-if="allMovementDelay['南']" style="position: absolute;bottom: 40px;right: 70px;">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                 width="10px" height="25px" viewBox="0 0 40.800000 104.800000"
                                 preserveAspectRatio="xMidYMid meet">
                              <metadata>
                                Created by potrace 1.13, written by Peter Selinger 2001-2015
                              </metadata>
                              <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000)"
                                 :fill="getSaturationColor(allMovementDelay['南']['左'])" stroke="none">
                                <path d="M95 1256 c-49 -29 -91 -58 -92 -63 -5 -13 186 -125 198 -117 5 3 9
18 9 35 0 29 0 29 61 29 54 0 64 -3 88 -29 49 -53 51 -72 51 -610 l0 -501 45
0 46 0 -3 533 -3 532 -25 49 c-14 27 -43 63 -64 80 -34 28 -46 31 -117 35
l-79 3 0 39 c0 25 -4 39 -12 38 -7 0 -53 -24 -103 -53z"/>
                              </g>
                            </svg>

                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                 width="10px" height="25px" viewBox="0 0 21.600000 104.800000"
                                 preserveAspectRatio="xMidYMid meet">
                              <metadata>
                                Created by potrace 1.13, written by Peter Selinger 2001-2015
                              </metadata>
                              <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000) "
                                 :fill="getSaturationColor(allMovementDelay['南']['直'])" stroke="none">
                                <path d="M62 1200 c-34 -60 -62 -114 -62 -120 0 -5 20 -10 45 -10 l45 0 0
-535 0 -535 45 0 45 0 0 535 0 535 46 0 c32 0 44 4 42 13 -7 28 -124 227 -133
227 -5 0 -38 -50 -73 -110z"/>
                              </g>
                            </svg>

                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                 width="10px" height="25px" viewBox="0 0 40.800000 104.800000"
                                 preserveAspectRatio="xMidYMid meet">
                              <metadata>
                                Created by potrace 1.13, written by Peter Selinger 2001-2015
                              </metadata>
                              <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000)"
                                 :fill="getSaturationColor(allMovementDelay['南']['右'])" stroke="none">
                                <path d="M300 1271 l0 -39 -79 -3 c-71 -4 -83 -7 -117 -35 -21 -17 -50 -53
-64 -80 l-25 -49 -3 -532 -3 -533 46 0 45 0 0 501 c0 538 2 557 51 610 24 26
34 29 88 29 61 0 61 0 61 -29 0 -17 4 -32 9 -35 12 -8 203 104 198 117 -3 11
-183 117 -198 117 -5 0 -9 -18 -9 -39z"/>
                              </g>
                            </svg>
                          </div>

                          <div v-if="allMovementDelay['西']"
                               style="position: absolute;top: 130px;left: 30px;;transform: rotate(90deg)">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                 width="10px" height="25px" viewBox="0 0 40.800000 104.800000"
                                 preserveAspectRatio="xMidYMid meet">
                              <metadata>
                                Created by potrace 1.13, written by Peter Selinger 2001-2015
                              </metadata>
                              <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000)"
                                 :fill="getSaturationColor(allMovementDelay['西']['左'])" stroke="none">
                                <path d="M95 1256 c-49 -29 -91 -58 -92 -63 -5 -13 186 -125 198 -117 5 3 9
18 9 35 0 29 0 29 61 29 54 0 64 -3 88 -29 49 -53 51 -72 51 -610 l0 -501 45
0 46 0 -3 533 -3 532 -25 49 c-14 27 -43 63 -64 80 -34 28 -46 31 -117 35
l-79 3 0 39 c0 25 -4 39 -12 38 -7 0 -53 -24 -103 -53z"/>
                              </g>
                            </svg>

                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                 width="10px" height="25px" viewBox="0 0 21.600000 104.800000"
                                 preserveAspectRatio="xMidYMid meet">
                              <metadata>
                                Created by potrace 1.13, written by Peter Selinger 2001-2015
                              </metadata>
                              <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000) "
                                 :fill="getSaturationColor(allMovementDelay['西']['直'])" stroke="none">
                                <path d="M62 1200 c-34 -60 -62 -114 -62 -120 0 -5 20 -10 45 -10 l45 0 0
-535 0 -535 45 0 45 0 0 535 0 535 46 0 c32 0 44 4 42 13 -7 28 -124 227 -133
227 -5 0 -38 -50 -73 -110z"/>
                              </g>
                            </svg>

                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                 width="10px" height="25px" viewBox="0 0 40.800000 104.800000"
                                 preserveAspectRatio="xMidYMid meet">
                              <metadata>
                                Created by potrace 1.13, written by Peter Selinger 2001-2015
                              </metadata>
                              <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000)"
                                 :fill="getSaturationColor(allMovementDelay['西']['右'])" stroke="none">
                                <path d="M300 1271 l0 -39 -79 -3 c-71 -4 -83 -7 -117 -35 -21 -17 -50 -53
-64 -80 l-25 -49 -3 -532 -3 -533 46 0 45 0 0 501 c0 538 2 557 51 610 24 26
34 29 88 29 61 0 61 0 61 -29 0 -17 4 -32 9 -35 12 -8 203 104 198 117 -3 11
-183 117 -198 117 -5 0 -9 -18 -9 -39z"/>
                              </g>
                            </svg>
                          </div>

                          <div v-if="allMovementDelay['北']"
                               style="position: absolute;top: 40px;left: 70px;transform: rotate(180deg)">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                 width="10px" height="25px" viewBox="0 0 40.800000 104.800000"
                                 preserveAspectRatio="xMidYMid meet">
                              <metadata>
                                Created by potrace 1.13, written by Peter Selinger 2001-2015
                              </metadata>
                              <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000)"
                                 :fill="getSaturationColor(allMovementDelay['北']['左'])" stroke="none">
                                <path d="M95 1256 c-49 -29 -91 -58 -92 -63 -5 -13 186 -125 198 -117 5 3 9
18 9 35 0 29 0 29 61 29 54 0 64 -3 88 -29 49 -53 51 -72 51 -610 l0 -501 45
0 46 0 -3 533 -3 532 -25 49 c-14 27 -43 63 -64 80 -34 28 -46 31 -117 35
l-79 3 0 39 c0 25 -4 39 -12 38 -7 0 -53 -24 -103 -53z"/>
                              </g>
                            </svg>

                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                 width="10px" height="25px" viewBox="0 0 21.600000 104.800000"
                                 preserveAspectRatio="xMidYMid meet">
                              <metadata>
                                Created by potrace 1.13, written by Peter Selinger 2001-2015
                              </metadata>
                              <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000) "
                                 :fill="getSaturationColor(allMovementDelay['北']['直'])" stroke="none">
                                <path d="M62 1200 c-34 -60 -62 -114 -62 -120 0 -5 20 -10 45 -10 l45 0 0
-535 0 -535 45 0 45 0 0 535 0 535 46 0 c32 0 44 4 42 13 -7 28 -124 227 -133
227 -5 0 -38 -50 -73 -110z"/>
                              </g>
                            </svg>

                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                 width="10px" height="25px" viewBox="0 0 40.800000 104.800000"
                                 preserveAspectRatio="xMidYMid meet">
                              <metadata>
                                Created by potrace 1.13, written by Peter Selinger 2001-2015
                              </metadata>
                              <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000)"
                                 :fill="getSaturationColor(allMovementDelay['北']['右'])" stroke="none">
                                <path d="M300 1271 l0 -39 -79 -3 c-71 -4 -83 -7 -117 -35 -21 -17 -50 -53
-64 -80 l-25 -49 -3 -532 -3 -533 46 0 45 0 0 501 c0 538 2 557 51 610 24 26
34 29 88 29 61 0 61 0 61 -29 0 -17 4 -32 9 -35 12 -8 203 104 198 117 -3 11
-183 117 -198 117 -5 0 -9 -18 -9 -39z"/>
                              </g>
                            </svg>
                          </div>

                        </div>

                        <div style="width: 20px;line-height: 245px;font-size: 12px">东</div>
                      </div>
                    </el-col>
                    <el-col :offset="3" :span="7" style="padding: 50px 0 0 20px;">
                      <div class="">
                        <ul class="Node_delay_time">
                          <li>
                            <div style="transform: rotate(90deg);position: absolute;top: 3px;margin-left: -35px">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="14px" height="32px" viewBox="0 0 21.600000 104.800000"
                                   preserveAspectRatio="xMidYMid meet">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000) "
                                   fill="green" stroke="none">
                                  <path d="M62 1200 c-34 -60 -62 -114 -62 -120 0 -5 20 -10 45 -10 l45 0 0
-535 0 -535 45 0 45 0 0 535 0 535 46 0 c32 0 44 4 42 13 -7 28 -124 227 -133
227 -5 0 -38 -50 -73 -110z"/>
                                </g>
                              </svg>
                            </div>
                            <span>延误时间 < 30秒</span>
                          </li>
                          <li>
                            <div style="transform: rotate(90deg);position: absolute;top: 3px;margin-left: -35px">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="14px" height="32px" viewBox="0 0 21.600000 104.800000"
                                   preserveAspectRatio="xMidYMid meet">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000) "
                                   fill="#e7c936" stroke="none">
                                  <path d="M62 1200 c-34 -60 -62 -114 -62 -120 0 -5 20 -10 45 -10 l45 0 0
-535 0 -535 45 0 45 0 0 535 0 535 46 0 c32 0 44 4 42 13 -7 28 -124 227 -133
227 -5 0 -38 -50 -73 -110z"/>
                                </g>
                              </svg>
                            </div>
                            <span>延误时间 30-50秒</span>
                          </li>
                          <li>
                            <div style="transform: rotate(90deg);position: absolute;top: 3px;margin-left: -35px">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="14px" height="32px" viewBox="0 0 21.600000 104.800000"
                                   preserveAspectRatio="xMidYMid meet">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000) "
                                   fill="darkorange" stroke="none">
                                  <path d="M62 1200 c-34 -60 -62 -114 -62 -120 0 -5 20 -10 45 -10 l45 0 0
-535 0 -535 45 0 45 0 0 535 0 535 46 0 c32 0 44 4 42 13 -7 28 -124 227 -133
227 -5 0 -38 -50 -73 -110z"/>
                                </g>
                              </svg>
                            </div>
                            <span>延误时间 50-60秒</span>
                          </li>
                          <li>
                            <div style="transform: rotate(90deg);position: absolute;top: 3px;margin-left: -35px">
                              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   width="14px" height="32px" viewBox="0 0 21.600000 104.800000"
                                   preserveAspectRatio="xMidYMid meet">
                                <metadata>
                                  Created by potrace 1.13, written by Peter Selinger 2001-2015
                                </metadata>
                                <g transform="translate(0.000000,104.800000) scale(0.080000,-0.080000) "
                                   fill="red" stroke="none">
                                  <path d="M62 1200 c-34 -60 -62 -114 -62 -120 0 -5 20 -10 45 -10 l45 0 0
-535 0 -535 45 0 45 0 0 535 0 535 46 0 c32 0 44 4 42 13 -7 28 -124 227 -133
227 -5 0 -38 -50 -73 -110z"/>
                                </g>
                              </svg>
                            </div>
                            <span>延误时间 > 60秒</span>
                          </li>
                        </ul>
                      </div>
                    </el-col>


                    <div style="position: absolute;
    bottom: 10px;
    width: 75px;
    right: 0;">单位：{{currentTabs==='0'?'pcu':'s'}}
                    </div>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>

          <div style="width: 100%;margin-top: 20px;margin-bottom: 30px">
            <time-line @newTime="getNewTime"></time-line>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AreaSelect from '../../components/Area/Area'
  import RoadNetMap from '../../components/Map/Map'
  import TimeLine from '../../components/TimeLine/TimeLine'
  import RoadGauge from '../../components/ECharts/RoadGaugeItem'

  export default {
    components: {
      AreaSelect,
      RoadNetMap,
      TimeLine,
      RoadGauge,
    },
    data() {
      return {
        roadNetCongestionScore: 0,
        nodeData: {
          node: {}
        },
        currentSignal: [],
        nodeLength: {
          values: []
        },
        signalText: {
          d1: '北-左',
          d2: '南-直',
          d3: '东-左',
          d4: '西-直',
          d5: '南-左',
          d6: '北-直',
          d7: '西-左',
          d8: '东-直',
        },
        signalPlan: {},
        lineLeft: 0,
        startPosition: 0,
        endPosition: 0,
        isChangeTime: false,
        motorVehicleFlow: {},
        nonMotorVehicleFlow: {},
        allLinksName: {},
        allMovementDelay: {},
        allMovementFlow: {},
        currentTabs: '0',
        currentDirection: ['南', '东', '北', '西'],
        currentDirectionLetter: {
          '南': 'N', '东': 'W', '北': 'S', '西': 'S'
        },
        currentColor: {},
        loadingFlow: false,
        loadingDelay: false,
        loadingLength: false,
        loadingSignal: false,
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getAllData();
      },
      getAllData(startTime, endTime) {
        this.getNodeCongestionSource(startTime, endTime);
        this.getRoadNetCongestionScore(startTime, endTime);
        this.getNodeAllDataD13ByNodeId(startTime, endTime);
        this.getSignalByNodeId(startTime, endTime);
        this.getNodeMovement(startTime, endTime);
        this.getAllLinks();

      },
      jumpPage(key) {
        this.$router.push(key);
      },
      setUrlDate(startTime, endTime) {
        return (startTime && endTime) ? '&start=' + startTime + '&end=' + endTime + '&current=false' : '&current=true';
      },
      getAllLinks() {
        this.$http.get('/index/getAllLinksByNodeId?nodeId=' + this.$route.params.id + '&token=' + this.getHeader().token)
          .then((response) => {
            let obj = {};
            response.data.links.forEach((link) => {
              obj[link.link_direction] = link.link_name;
            });
            this.allLinksName = obj;
          })
      },
      getNodeMovement(startTime, endTime) {
        this.loadingFlow = true;
        this.loadingDelay = true;
        this.$http.get('/index/getAllMovementsByNodeId?nodeId=' + this.$route.params.id + '&token=' + this.getHeader().token)
          .then((response) => {
            this.getAllMovementFlow(response.data.movements, 0, startTime, endTime);
            this.getAllMovementDelay(response.data.movements, 0, startTime, endTime)
          })
      },
      getAllMovementFlow(data, num, startTime, endTime) {
        this.getMovementFlow(data[num].movement_id, startTime, endTime).then((result) => {
          data[num].car = result.car;
          data[num].bike = result.bike;
          data[num].total = result.total;

          if (num === data.length - 1) {
            this.allMovementFlow = this.getMovementDirectionFlow(data);
            this.loadingFlow = false;
          } else {
            num += 1;
            this.getAllMovementFlow(data, num, startTime, endTime);
          }
        })
      },
      getMovementDirectionFlow(data) {
        let direction = {};
        data.forEach((delay) => {
          if (direction[delay.link_direction]) {
            direction[delay.link_direction][delay.turning_direction] = delay;
          } else {
            direction[delay.link_direction] = {};
            direction[delay.link_direction][delay.turning_direction] = delay;
          }
        });
        return direction;
      },
      getMovementFlow(id, startTime, endTime) {
        return new Promise((resolve, reject) => {
          let url = '/nodeData/getNodeDataD1ByMovementId?movementId=' + id + '&token=' + this.getHeader().token;
          url += this.setUrlDate(startTime, endTime);
          let secondUrl = '/nodeData/getNodeDataD2ByMovementId?movementId=' + id + '&token=' + this.getHeader().token;
          secondUrl += this.setUrlDate(startTime, endTime);

          this.$http.get(url).then((response) => {
            this.$http.get(secondUrl).then((result) => {
              resolve({
                car: response.data.value,
                bike: result.data.value,
                total: response.data.value + result.data.value
              })
            })
          })
        });
      },
      getAllMovementDelay(data, num, startTime, endTime) {
        this.getMovementDelay(data[num].movement_id, startTime, endTime).then((result) => {
          data[num].delay = result;

          if (num === data.length - 1) {
            this.allMovementDelay = this.getMovementDirection(data);
            this.loadingDelay = false;
          } else {
            num += 1;
            this.getAllMovementDelay(data, num, startTime, endTime);
          }
        })
      },
      getMovementDirection(data) {
        let direction = {};
        data.forEach((delay) => {
          if (direction[delay.link_direction]) {
            direction[delay.link_direction][delay.turning_direction] = delay.delay;
          } else {
            direction[delay.link_direction] = {};
            direction[delay.link_direction][delay.turning_direction] = delay.delay;
          }
        });
        return direction;
      },
      getMovementDelay(id, startTime, endTime) {
        return new Promise((resolve, reject) => {
          let url = '/nodeData/getNodeDataD10ByMovementId?movementId=' + id + '&token=' + this.getHeader().token;
          url += this.setUrlDate(startTime, endTime);
          this.$http.get(url).then((response) => {
            resolve(response.data.value)
          })
        });
      },
      getNodeDataD5ByNodeId(nodeId, startTime, endTime) {  //机动车流量 + 非机动车流量
        return new Promise((resolve, reject) => {
          let url = '/nodeData/getNodeDataD5ByNodeId?nodeId=' + nodeId + '&token=' + this.getHeader().token;
          let secondUrl = '/nodeData/getNodeDataD6ByNodeId?nodeId=' + nodeId + '&token=' + this.getHeader().token;
          url += this.setUrlDate(startTime, endTime);
          secondUrl += this.setUrlDate(startTime, endTime);

          this.$http.get(url).then((response) => {
            this.$http.get(secondUrl).then((result) => {

              resolve(response.data.value + result.data.value)
            })
          })
        });
      },
      getNodeCongestionSource(startTime, endTime) { //交叉口延误数据
        let url = '/nodeData/getNodeDataD12ByNodeId?nodeId=' + this.$route.params.id + '&token=' + this.getHeader().token;
        url += this.setUrlDate(startTime, endTime);
        this.$http.get(url).then((response) => {
          this.getNodeDataD5ByNodeId(response.data.node_id, startTime, endTime).then((data) => {
            response.data.flow = data;
            this.nodeData = response.data;
          });
        })
      },
      getRoadNetCongestionScore(startTime, endTime) { //交叉口拥堵评分
        let url = '/nodeData/getNodeDataD22ByNodeId?nodeId='+ this.$route.params.id +'&token=' + this.getHeader().token;
        url += this.setUrlDate(startTime, endTime);
        this.$http.get(url).then((response) => {
          this.roadNetCongestionScore = response.data.value;
        })
      },
      getNodeAllDataD13ByNodeId(startTime, endTime) {  //交叉口排队长度
        this.loadingLength = true;

        let url = '/nodeData/getNodeAllDataD13ByNodeId?nodeId=' + this.$route.params.id + '&token=' + this.getHeader().token;
        url += this.setUrlDate(startTime, endTime);
        this.$http.get(url).then((response) => {
          this.nodeLength = response.data;
          this.loadingLength = false;
        })
      },
      getSignalByNodeId(startTime, endTime) { //信号灯配时方案
        this.loadingSignal = true;
        let url = '/signal/signalByNodeId?nodeId=' + this.$route.params.id + '&token=' + this.getHeader().token;
        url += endTime ? '&current=' + endTime : '&current=true';
        this.$http.get(url).then((response) => {
          this.currentSignal = response.data.value;
          let obj = {};
          response.data.value.forEach((value) => {
            value.total = value.AllRed + value.MaxGreen + value.Yellow;
            obj[value.BRP] = value;
          });
          obj.first = obj['111'].total + obj['112'].total + obj['121'].total + obj['122'].total;
          obj.second = obj['211'].total + obj['212'].total + obj['221'].total + obj['222'].total;
          this.signalPlan = obj;
          return 'true'
        }).then((val) => {
          this.getSignalColor(0);
          this.loadingSignal = false;
        })
      },
      setFlowOrDelay(val) {
        this.currentTabs = val;
      },
      getRoadFlow(key) {
        let text = '';
        switch (key) {
          case 'd1':
            text = '← d1';
            break;
          case 'd2':
            text = '↑ d2';
            break;
          case 'd3':
            text = '← d3';
            break;
          case 'd4':
            text = '→ d4';
            break;
          case 'd5':
            text = '← d5';
            break;
          case 'd6':
            text = '↓ d6';
            break;
          case 'd7':
            text = '→ d7';
            break;
          case 'd8':
            text = '→ d8';
            break;
        }
        return text
      },
      getSaturationColor(num) {
        if (num <= 30) {
          return "green"
        } else if (num > 30 && num <= 50) {
          return "#e7c936"
        } else if (num > 50 && num <= 60) {
          return "darkorange"
        } else if (num > 60) {
          return "red"
        } else {
          return "#c9c9cc"
        }
      },
      moveSignalLine(e) {
        this.isChangeTime = true;
        this.startPosition = e.clientX;
      },
      changeSignalLine(e) {
        if (!this.isChangeTime) return;
        this.endPosition = e.clientX;
        if (this.lineLeft + this.endPosition - this.startPosition > 0) {
          document.getElementById('signal_line').style.left = this.lineLeft + this.endPosition - this.startPosition + 'px'
          this.getSignalColor((this.lineLeft + this.endPosition - this.startPosition) + 4);
        }
      },
      getSignalColor(left) {
        if (!document.getElementById('111_red')) {
          return console.log('---')
        }
        let width111 = document.getElementById('width111').offsetWidth;
        let width112 = document.getElementById('width112').offsetWidth + width111;
        let width121 = document.getElementById('width121').offsetWidth + width112;
        let width122 = document.getElementById('width122').offsetWidth + width121;
        let width211 = document.getElementById('width211').offsetWidth;
        let width212 = document.getElementById('width212').offsetWidth + width211;
        let width221 = document.getElementById('width221').offsetWidth + width212;
        let width222 = document.getElementById('width222').offsetWidth + width221;

        let d1 = document.getElementById('111_red').offsetWidth;
        let d1S = document.getElementById('111_yellow').offsetWidth;
        let d2 = document.getElementById('112_red').offsetWidth;
        let d2S = document.getElementById('112_yellow').offsetWidth;
        let d3 = document.getElementById('121_red').offsetWidth;
        let d3S = document.getElementById('121_yellow').offsetWidth;
        let d4 = document.getElementById('122_red').offsetWidth;
        let d4S = document.getElementById('122_yellow').offsetWidth;


        let d5 = document.getElementById('211_red').offsetWidth;
        let d5S = document.getElementById('211_yellow').offsetWidth;
        let d6 = document.getElementById('212_red').offsetWidth;
        let d6S = document.getElementById('212_yellow').offsetWidth;
        let d7 = document.getElementById('221_red').offsetWidth;
        let d7S = document.getElementById('221_yellow').offsetWidth;
        let d8 = document.getElementById('222_red').offsetWidth;
        let d8S = document.getElementById('222_yellow').offsetWidth;
        this.currentColor = {};
        console.log(left)
        console.log(width122)
        if (left <= width111) {
          if (left <= d1) {
            this.currentColor[this.signalPlan['111'].key] = 'green';
          } else {
            this.currentColor[this.signalPlan['111'].key] = 'yellow';
          }
        } else if (left > width111 && left <= width112) {
          if (left <= width111 + d2) {
            this.currentColor[this.signalPlan['112'].key] = 'green';
          } else {
            this.currentColor[this.signalPlan['112'].key] = 'yellow';
          }
        } else if (left > width112 && left <= width121) {
          if (left <= width112 + d3) {
            this.currentColor[this.signalPlan['121'].key] = 'green';
          } else {
            this.currentColor[this.signalPlan['121'].key] = 'yellow';
          }
        } else if (left > width121 && left <= width122) {
          if (left <= width121 + d4) {
            this.currentColor[this.signalPlan['122'].key] = 'green';
          } else {
            this.currentColor[this.signalPlan['122'].key] = 'yellow';
          }
        }

        if (left <= width211) {
          if (left <= d5) {
            this.currentColor[this.signalPlan['211'].key] = 'green';
          } else {
            this.currentColor[this.signalPlan['211'].key] = 'yellow';
          }
        } else if (left > width211 && left <= width212) {
          if (left <= width211 + d6) {
            this.currentColor[this.signalPlan['212'].key] = 'green';
          } else {
            this.currentColor[this.signalPlan['212'].key] = 'yellow';
          }
        } else if (left > width212 && left <= width221) {
          if (left <= width212 + d7) {
            this.currentColor[this.signalPlan['221'].key] = 'green';
          } else {
            this.currentColor[this.signalPlan['221'].key] = 'yellow';
          }
        } else if (left > width221 && left <= width222) {
          if (left <= width221 + d8) {
            this.currentColor[this.signalPlan['222'].key] = 'green';
          } else {
            this.currentColor[this.signalPlan['222'].key] = 'yellow';
          }
        }
      },
      stopChange() {
        if (this.isChangeTime) {
          this.isChangeTime = false;
          this.changePosition();
        }
      },
      changePosition() {
        if (this.endPosition && this.startPosition) {
          this.lineLeft = this.lineLeft + this.endPosition - this.startPosition;
          this.endPosition = 0;
          this.startPosition = 0;
        }
      },
      getNewTime(val) {
        if (this.startTime !== 0 && val > this.startTime) {
          if (val - this.startTime >= 5 * 60 * 1000) {
            console.log(this.formatDate(new Date(val), 'yy-MM-dd hh:mm:ss'))
            this.getAllData(this.startTime, val);
            this.startTime = 0;
          }
        } else if (val < this.startTime) {
          this.getAllData(val, val + 5 * 60 * 1000);
          this.setRoadNetStatus(this.currentRoadNet, val, val + 5 * 60 * 1000);
          this.startTime = 0;
        } else {
          this.startTime = val;
        }
      },
      rotateNode(deg) {
        document.getElementById('node_animated_float').style.display = 'none';
        if (deg === 90) {
          document.getElementById('node_animated').className = 'animated rotateLeft';
        } else if (deg === 270) {
          document.getElementById('node_animated').className = 'animated rotateRight';
        } else if (deg === 180) {
          document.getElementById('node_animated').className = 'animated rotateTop';
        }

        setTimeout(() => {
          document.getElementById('node_animated').className = 'animated fadeIn';

          for (let i = 0; i < (deg / 90); i++) {
            console.log(deg)
            this.currentDirection.push(this.currentDirection.shift())
          }

          setTimeout(() => {
            document.getElementById('node_animated_float').style.display = 'block';
          }, 200)

        }, 1000)
      },
    },
  }
</script>

<style scoped>

  @-webkit-keyframes rotateLeft {
    from {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
      opacity: 1;
    }

    20% {
      -webkit-transform: scale3d(1.3, 1.3, 1.3);
      transform: scale3d(1.3, 1.3, 1.3);
    }

    50% {
      -webkit-transform: scale3d(2.5, 2, 1.7) rotate3d(0, 0, 1, 90deg);
      transform: scale3d(2.5, 2, 1.7) rotate3d(0, 0, 1, 90deg);
    }

    to {
      opacity: 0;
      -webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 90deg);
      transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 90deg);
    }
  }

  @keyframes rotateLeft {
    from {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
      opacity: 1;
    }

    20% {
      -webkit-transform: scale3d(1.3, 1.3, 1.3);
      transform: scale3d(1.3, 1.3, 1.3);
    }

    50% {
      -webkit-transform: scale3d(2.5, 2, 1.7) rotate3d(0, 0, 1, 90deg);
      transform: scale3d(2.5, 2, 1.7) rotate3d(0, 0, 1, 90deg);
    }

    to {
      opacity: 0;
      -webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 90deg);
      transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 90deg);
    }
  }

  .rotateLeft {
    -webkit-animation-name: rotateLeft;
    animation-name: rotateLeft;
    animation-duration: 2s;
  }

  .rotateRight {
    -webkit-animation-name: rotateRight;
    animation-name: rotateRight;
    animation-duration: 2s;
  }

  @-webkit-keyframes rotateRight {
    from {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
      opacity: 1;
    }

    20% {
      -webkit-transform: scale3d(1.3, 1.3, 1.3);
      transform: scale3d(1.3, 1.3, 1.3);
    }

    50% {
      -webkit-transform: scale3d(2.5, 2, 1.7) rotate3d(0, 0, 1, -90deg);
      transform: scale3d(2.5, 2, 1.7) rotate3d(0, 0, 1, -90deg);
    }

    to {
      opacity: 0;
      -webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -90deg);
      transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -90deg);
    }
  }

  @keyframes rotateRight {
    from {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
      opacity: 1;
    }

    20% {
      -webkit-transform: scale3d(1.3, 1.3, 1.3);
      transform: scale3d(1.3, 1.3, 1.3);
    }

    50% {
      -webkit-transform: scale3d(2.5, 2, 1.7) rotate3d(0, 0, 1, -90deg);
      transform: scale3d(2.5, 2, 1.7) rotate3d(0, 0, 1, -90deg);
    }

    to {
      opacity: 0;
      -webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -90deg);
      transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -90deg);
    }
  }

  .rotateTop {
    -webkit-animation-name: rotateTop;
    animation-name: rotateTop;
    animation-duration: 2s;
  }

  @-webkit-keyframes rotateTop {
    from {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
      opacity: 1;
    }

    20% {
      -webkit-transform: scale3d(1.3, 1.3, 1.3);
      transform: scale3d(1.3, 1.3, 1.3);
    }

    50% {
      -webkit-transform: scale3d(2.5, 2, 1.7) rotate3d(0, 0, 1, 160deg);
      transform: scale3d(2.5, 2, 1.7) rotate3d(0, 0, 1, 160deg);
    }

    to {
      opacity: 0;
      -webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 160deg);
      transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 160deg);
    }
  }

  @keyframes rotateTop {
    from {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
      opacity: 1;
    }

    20% {
      -webkit-transform: scale3d(1.3, 1.3, 1.3);
      transform: scale3d(1.3, 1.3, 1.3);
    }

    50% {
      -webkit-transform: scale3d(2.5, 2, 1.7) rotate3d(0, 0, 1, 160deg);
      transform: scale3d(2.5, 2, 1.7) rotate3d(0, 0, 1, 160deg);
    }

    to {
      opacity: 0;
      -webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 160deg);
      transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 160deg);
    }
  }

  .Road_border {
    width: 19px;
    height: 19px;
    border-radius: 50%;
    float: left;
    margin: 7px 10px 0 10px;
  }

  .Road_circle {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    margin: 1px 0 0 1px
  }

  .Dashboard_box_card {
    border-radius: 1px;
    color: white !important;
    border: 0;
  }

  .Dashboard_clearfix {
    padding: 10px 30px;
    background: #353644;
    font-size: 15px;
  }

  .Dashboard_lineRow {
    margin: 10px 5px !important;
  }

  .Road_row_link {
    width: 63%;
    position: absolute;
    top: 10px;
    left: 1%;
    background: #1f1f2c;
    line-height: 30px;
  }

  .Road_row_link span {
    margin-left: 10px;
  }

  .Dashboard_card_roadGauge {
    height: 180px;
    margin-bottom: -70px
  }

  .Node_right {
    position: absolute;
    width: 35%;
    background: #1f1f2c;
    top: -1px;
    right: 0
  }

  .Node_right_bottom {
    height: 310px;
    margin-top: 10px;
    background: #353644;
    text-align: center;
    font-size: 12px
  }

  .Node_signal_lamp {
    padding-top: 2px;
  }

  .Node_signal_lamp li {
    width: 21px;
    height: 21px;
    margin: 5px auto;
    border-radius: 50%;
    background: #21222b;
  }

  .Node_row_list {
    text-align: center;
  }

  .Node_row_list ul {
    padding-bottom: 10px;
    margin: 0 5px;
    border-bottom: 2px solid #494a56;
  }

  .Node_row_list span {
    position: absolute;
    left: 35px;
    line-height: 10px;
  }

  .Node_row_list li {
    font-size: 12px;
    color: #c9c9cc;
    margin: 10px 0;
  }

  .Node_div_list {
    margin: 20px 0;
  }

  .Node_delay_time li {
    color: #c9c9cc;
    padding: 10px 0;
    font-size: 12px;
    position: relative;
  }

  .block {
    height: 105px;
    width: 30%;
    color: #c9c9cc;
    line-height: 25px;
    font-size: 12px;
  }

  .block span {
    letter-spacing: 0;
  }

  .Node_length_list {
    padding: 0 20px;
  }

  .Node_length_list_right span {
    margin-right: 10px;
  }

  .Node_length_list_left span {
    margin-left: 10px;
  }

  .signal_current_line {
    position: absolute;
    top: 0;
    width: 16px;
    height: 100%;
    background-size: cover;
    overflow: visible;
    z-index: 70;
    background: url("../../../static/timeLine/line.png") center;
    background-size: 20px 100%;
  }

  .signal_current_line image {
    position: absolute;
    width: 40px;
    height: 80px;
  }

  .signal_road_score {
    position: absolute;
    right: 36%;
    top: 50px;
    height: 140px;
    width: 170px;
    background: rgba(41, 41, 54, 0.9);
    text-align: center
  }

  .signal_left_block {
    background: #353644;
    border-radius: 5px;
    box-shadow: 1px 1px 1px #111;
    left: 1%;
    width: 60px;
    position: absolute;
    z-index: 20;
  }

  .signal_node_info {
    position: absolute;
    bottom: 50px;
    font-size: 55px;
    z-index: 10;
    transform: rotate(275deg);
  }

</style>
