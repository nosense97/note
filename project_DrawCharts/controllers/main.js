import {
    StackedColumnChart1,
    PieChart1,
    MaterialColumnChart1,

} from './DAL.js';

// -----------------------

// Biểu đồ tròn: Tỷ lệ các thành phần trong Location
PieChart1('#chart_div')

// Biểu đồ cột chồng: Thời gian hoạt động / nghỉ của phương tiện di chuyển
StackedColumnChart1('#chart_1')

// Biểu đồ cột: CBM, Capacity của phương tiện
MaterialColumnChart1('#MaterialColumnChart1')