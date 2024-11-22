import React, { createContext, useEffect, useState } from 'react'
export const RouterStore = createContext()
const RouterContext = (props) => {
    let [loginstatus, setLoginStatus] = useState(false)
    const [payrollRoutersLinks, setpayrollRoutersLinks] = useState()
    const [settingRouterLinks, setSettingRouterLink] = useState()
    const [employeeRouterLink, setemployeeRouterLink] = useState()
    const [leaveRouterLinks, setLeaveRouterLinks] = useState()
    useEffect(() => {
        let status = JSON.parse(sessionStorage.getItem('user'))?.Disgnation
        let empid = JSON.parse(sessionStorage.getItem('dasid'))
        setSettingRouterLink([
            {
                label: 'Holidays',
                path: '/settings/holidays',
                show: true,
                active: 'holidays'
            },
            {
                label: 'Change Password',
                path: '/settings/password',
                show: true,
                active: 'password'
            },

            {
                label: 'Attendence',
                path: '/settings/attendence',
                show: true,
                active: 'attendence'
            },
            {
                label: 'Job Posting',
                path: '/settings/jobposting',
                show: true,
                active: 'jobposting'
            },
        ])
        setemployeeRouterLink([
            {
                label: 'All Employees',
                path: `/employees/`,
                active: 'all',
                keyword: ['employee', 'active employee', 'inactive', 'people'],
                show: status == 'HR' || status == 'Admin',
            },
            {
                label: 'Department',
                path: `/employees/department`,
                active: 'department',
                keyword: ['employee', 'active employee', 'inactive', 'people'],
                show: status == 'HR' || status == 'Admin',
            },
            {
                label: 'Designation',
                path: `/employees/designation`,
                active: 'designation',
                keyword: ['employee', 'active employee', 'inactive', 'people'],
                show: status == 'HR' || status == 'Admin',
            },
            {
                label: 'Mass Mail',
                path: '/employees/Mass_Mail',
                active: 'mail',
                keyword: ['employee', 'communication', 'message', 'notice'],
                show: status == 'HR' || status == 'Admin',
            },
            {
                label: 'Employee Overview',
                path: '/employees/Employee_Overview',
                active: 'overview',
                show: status == 'HR' || status == 'Admin',
            },
            {
                label: 'Offer Aproval',
                path: '/employees/offerApproval',
                active: 'offer',
                show: status == 'HR' || status == 'Admin',
            },
            {
                label: 'Exit Process',
                path: '/employees/Employee_request_form',
                active: 'exit',
                show: true
            }
        ])
        setpayrollRoutersLinks([
            {
                label: 'Salary Component',
                path: `/payroll/salaryComponent`,
                active: 'salarycom',
                keyword: ['salary', 'component', 'creation'],
                show: status == 'HR' || status == 'Admin'
            },
            {
                label: 'Salary Template',
                path: `/payroll/salary-templates`,
                active: 'template',
                keyword: ['template',],
                show: status == 'HR' || status == 'Admin'
            },
            {
                label: 'Salary Assigning',
                path: `/payroll/salary-assigning`,
                active: 'assiging',
                keyword: ['template', 'employee', 'people'],
                show: status == 'HR' || status == 'Admin'
            },
            {
                label: 'Employee Payslips',
                path: `/payroll/employeesPayslip`,
                active: 'allpayslip',
                keyword: ['payslip', 'employee', 'people'],
                show: status == 'HR' || status == 'Admin'
            },
        ])
        setLeaveRouterLinks([
            {
                label: 'Leave Summary',
                path: `/leave/`,
                keyword: ['leave', 'request'],
                active: 'summary',
                show: true,
            },
            {
                label: 'Apply Leave ',
                path: '/leave/apply',
                keywrod: ['leave', 'apply'],
                active: 'leave',
                show: true
            },
            {
                label: 'Leave Approval',
                path: `/leave/approvals`,
                keyword: ['leave', 'request'],
                active: 'approval',
                show: status == 'HR' || status == 'Admin',
            },
            {
                label: 'Attendance list',
                path: `/leave/attendence-list`,
                active: 'list',
                keywrod: ['list', 'leave', 'attendance', 'report', 'employee'],
                show: status == 'HR' || status == 'Admin',
            },
            {
                label: 'Leave Request History',
                path: `/leave/history`,
                active: 'history',
                keyword: ['history', 'people'],
                show: status == 'HR' || status == 'Admin',
            },
            {
                label: 'Leave Creation',
                path: `/leave/leaveCreation`,
                keyword: ['leave', 'leave type', 'create'],
                active: 'creation',
                show: status == 'HR' || status == 'Admin',
            },
        ])
    }, [loginstatus])
    let value = {
        settingRouterLinks, payrollRoutersLinks, leaveRouterLinks, employeeRouterLink, setLoginStatus
    }
    return (
        <RouterStore.Provider value={value} >
            {props.children}
        </RouterStore.Provider>
    )
}

export default RouterContext