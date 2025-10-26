import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
import os from 'os'

const PORT = Number(process.env.PORT ?? 3000)

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/news', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM news ORDER BY id DESC')
    res.json(rows)
  } catch (error) {
    console.error('Failed to fetch news:', error)
    res.status(500).json({ message: '获取新闻失败', detail: error.message })
  }
})

app.get('/api/news/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id])
    if (rows.length === 0) {
      return res.status(404).json({ message: '未找到对应新闻' })
    }
    res.json(rows[0])
  } catch (error) {
    console.error('Failed to fetch news item:', error)
    res.status(500).json({ message: '获取新闻失败', detail: error.message })
  }
})

app.post('/api/news', async (req, res) => {
  const { title, content } = req.body

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ message: '标题和内容不能为空' })
  }

  const addTime = new Date().toLocaleString('zh-CN', {
    hour12: false
  })

  try {
    const [result] = await pool.query(
      'INSERT INTO news (title, content, add_time) VALUES (?, ?, ?)',
      [title.trim(), content.trim(), addTime]
    )

    res.status(201).json({
      id: result.insertId,
      title: title.trim(),
      content: content.trim(),
      add_time: addTime
    })
  } catch (error) {
    console.error('Failed to add news:', error)
    res.status(500).json({ message: '添加新闻失败', detail: error.message })
  }
})

app.put('/api/news/:id', async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ message: '标题和内容不能为空' })
  }

  try {
    const [result] = await pool.query(
      'UPDATE news SET title = ?, content = ? WHERE id = ?',
      [title.trim(), content.trim(), id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '未找到对应新闻' })
    }

    res.json({ message: '新闻已更新' })
  } catch (error) {
    console.error('Failed to update news:', error)
    res.status(500).json({ message: '更新新闻失败', detail: error.message })
  }
})

app.delete('/api/news/:id', async (req, res) => {
  const { id } = req.params

  try {
    const [result] = await pool.query('DELETE FROM news WHERE id = ?', [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '未找到对应新闻' })
    }

    res.json({ message: '新闻已删除' })
  } catch (error) {
    console.error('Failed to delete news:', error)
    res.status(500).json({ message: '删除新闻失败', detail: error.message })
  }
})

function logAccessUrls(port) {
  const networks = os.networkInterfaces()
  const addresses = new Set(['127.0.0.1', 'localhost'])

  Object.values(networks)
    .flatMap((iface) => iface ?? [])
    .filter((iface) => iface?.family === 'IPv4' && !iface.internal)
    .forEach((iface) => addresses.add(iface.address))

  console.log('📡 API endpoints:')
  for (const address of addresses) {
    console.log(`  → http://${address}:${port}/api/news`)
  }
}

async function start() {
  try {
    const connection = await pool.getConnection()
    console.log('✅ MySQL 已连接成功')
    connection.release()
  } catch (error) {
    console.error('❌ 无法连接到 MySQL，请检查配置:', error.message)
  }

  app.listen(PORT, () => {
    console.log(`🚀 News API server is running on port ${PORT}`)
    logAccessUrls(PORT)
  })
}

start().catch((error) => {
  console.error('服务器启动失败:', error)
  process.exit(1)
})
