import { Col, ConfigProvider, Layout, Menu, Row, Switch, Typography, theme } from 'antd'
import React, { useState } from 'react'
import examples from './examples'

const { Header, Content } = Layout
const keys = Object.keys(examples)

function App() {
  const { token } = theme.useToken()

  const [darkMode, setDarkMode] = useState(false)
  const [selectedMenu, setMenu] = useState(keys[0])

  return (
    <ConfigProvider theme={{ algorithm: theme[darkMode ? 'darkAlgorithm' : 'defaultAlgorithm'] }}>
      <Layout style={{ height: '100vh' }}>
        <Header style={{ backgroundColor: darkMode ? undefined : token.colorBgContainer }}>
          <Row justify='space-between' align='middle'>
            <Col span={4}>
              <Typography.Text style={{ color: darkMode ? token.colorWhite : token.colorPrimary, fontSize: token.sizeMS }}>Appointment Calender Carousel</Typography.Text>
            </Col>
            <Col span={16}>
              <Menu
                selectedKeys={[selectedMenu]}
                theme={darkMode ? 'dark' : 'light'}
                mode='horizontal'
                items={keys.map((key) => ({
                  key,
                  label: key,
                  onClick() {
                    setMenu(key)
                  },
                }))}
              />
            </Col>
            <Col span={4} style={{ textAlign: 'end' }}>
              <Switch checkedChildren='Dark' unCheckedChildren='Light' checked={darkMode} onChange={() => setDarkMode((prev) => !prev)} />
            </Col>
          </Row>
        </Header>

        <Content>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {keys.map((key) => {
              if (key !== selectedMenu) return null
              const Example = examples[key]
              return <Example key={key} />
            })}
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
