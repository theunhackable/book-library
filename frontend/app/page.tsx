import BooksTable from '@/components/BooksTable'
import Header from '@/components/Header'
import UserDetails from '@/components/UserDetails'

export default function Home() {
  return (
    <main>
      <Header />
      <UserDetails />
      <BooksTable />

    </main>
  )
}
