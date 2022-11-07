import {
    StackedColumnChart1,
    StackedColumnChart2,
    StackedColumnChart3,
    PieChart1,
    PieChart2,
    PieChart3,
    MaterialColumnChart1,
    ComboChart1,
    ComboChart2,
    ComboChart3,
    ComboChart4,
    ComboChart5,
    ComboChart6,
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

// Thời gian chạy của xe từ depot tham lam tới 1 điểm gần nhất
ComboChartsWithStackedColumn1('#ComboChartsWithStackedColumn1')

// Biểu đồ cột chồng: Thời gian hoạt động/nghỉ của Customer
StackedColumnChart2("#StackedColumnChart2")

// Biểu đồ cột chồng: Thời gian hoạt động/nghỉ của Depot
StackedColumnChart3("#StackedColumnChart3")

// Biểu đồ kết hợp: Time and fixed time with Depots
ComboChart4("#ComboChart4")

// Biểu đồ cột đường kết hợp: Tổng weight và cbm, số item và số lượng từng item
ComboChart5("#ComboChart5")

// Biểu đồ cột đường: Quãng đường và thời gian của từng đơn hàng
ComboChart6("#ComboChart6")


PieChart2("#PieChart2")
PieChart3("#PieChart3")