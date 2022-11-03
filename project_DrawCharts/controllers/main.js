import {
    StackedColumnChart1,
    PieChart1,
    MaterialColumnChart1,
    ComboChart1,
    ComboChart2,
    ComboChart3,
    ComboChartsWithStackedColumn1,
} from './DAL.js';

// -----------------------

// Biểu đồ tròn: Tỷ lệ các thành phần trong Location
PieChart1('#chart_div')

// Biểu đồ cột chồng: Thời gian hoạt động / nghỉ của phương tiện di chuyển
StackedColumnChart1('#chart_1')

// Biểu đồ cột: CBM, Capacity của phương tiện
MaterialColumnChart1('#MaterialColumnChart1')

// Biểu đồ cột đường kết hợp: thời gian Load/Unload time của phương tiện với CBM
ComboChart1("#ComboChart1")

// Biểu đồ cột đường kết hợp: thời gian Load/Unload time của phương tiện với Capacity
ComboChart2("#ComboChart2")

// Biểu đồ cột: Unload time per Ton/Capacity với Fixed Unload Time của Customer
ComboChart3("#ComboChart3")

// Biểu đồ cột chồng: Thời gian hoạt động/nghỉ của Customer
ComboChartsWithStackedColumn1('#ComboChartsWithStackedColumn1')