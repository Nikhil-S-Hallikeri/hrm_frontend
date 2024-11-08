import React from 'react'

const ClientRequirmentTable = ({ data }) => {
    return (
        <div>
            <main className='tablebg my-3 rounded table-responsive max-h-[50vh] overflow-y-scroll ' >
                <table className='w-full  ' >
                    <tr className='sticky top-0 ' >
                        <th>SI no  </th>
                        <th> Job Name  </th>
                        <th> Job Location </th>
                        <th> Package </th>
                        <th> Expericence </th>
                        <th>Recuirters  </th>
                    </tr>

                </table>

            </main>

        </div>
    )
}

export default ClientRequirmentTable