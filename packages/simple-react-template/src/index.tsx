import React, { useState, useEffect, useCallback } from 'react'
import { render } from 'react-dom'
import '@/style/base.styl'
import { http } from '@/utils/http'

function Main () {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState(undefined)
  const [record, setRecord] = useState(undefined)

  const fetchData = useCallback(() => {
    http('/api/student', 'get').then((res) => {
      setData(res.data)
    })
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  const remove = useCallback((id) => {
    http(`/api/student?id=${id}`, 'delete').then((res) => {
      fetchData()
    })
  }, [])

  const add = useCallback(() => {
    http('/api/student', 'post', { name, age }).then(() => {
      fetchData()
      setAge('')
      setName('')
    })
  }, [name, age])

  const edit = useCallback((record, type: 'edit' | 'save') => {
    setRecord(record)
    if (type === 'save') {
      http('api/student', 'put', record).then((res) => {
        fetchData()
        setRecord(undefined)
      })
    }
  }, [record])

  return (
    <div
      style={{ color: 'red' }}
    >
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input
        value={age}
        type='number'
        onChange={(e) => {
          setAge(e.target.value)
        }}
      />
      <button
        onClick={() => {
          add()
        }}
      >
        新增
      </button>
      <table>
        <colgroup>
          <col width={100}></col>
          <col width={100}></col>
          <col width={100}></col>
        </colgroup>
        <tbody>
          {data.map((e) => {
            return (
              <tr key={e.id}>
                <td>
                  {record?.id === e.id ? <input value={record.name} onChange={(e) => { setRecord({ ...record, name: e.target.value }) }} /> : e.name}
                </td>
                <td>
                  {record?.id === e.id ? <input type='number' value={record.age} onChange={(e) => { setRecord({ ...record, age: e.target.value }) }} /> : e.age}
                </td>
                <td>
                  <span
                    className='href mr8'
                    onClick={() => {
                      edit(record ? record : e, record ? 'save' : 'edit')
                    }}
                  >
                    {record?.id === e.id ? '保存' : '修改'}
                  </span>
                  {record?.id !== e.id ? (
                    <span
                      style={{ color: 'red', cursor: 'pointer' }} onClick={() => remove(e.id)}
                    >
                      删除
                    </span>
                  ) : <span className='href' onClick={() => setRecord(undefined)}>取消</span>}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
render(
  <Main />,
  document.getElementById('app')
)
