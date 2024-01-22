import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux'
import { roundNumbers} from '../../utilityFunctions/roundNumbers.js';
import ProgressBar from '../GoalCard/ProgressBar/ProgressBar.jsx';

const Goals = () => {

  const goals = useSelector(state => state.goals.goals)

  if (goals === null) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className="goals">
      <header className='goals-header'>
          <h3>Goals</h3>
      </header>
      {goals.length === 0
      ?
        <p style={{textAlign: "center", marginTop: "10px"}}>No goals set</p>
      :
        <Table sx={{ maxWidth: "100%" }} aria-label="goal table" className='goal-table'>
          <TableHead>
            <TableRow>
              <TableCell>Goal Name</TableCell>
              <TableCell align="right">Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map(goal => (
              <TableRow key={goal.goal_name}>
                <TableCell component="th" scope="row">
                  {goal.goal_name}
                </TableCell>
                <TableCell align='right'><ProgressBar currentProg={goal.current_progress} endGoal={goal.end_goal}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </div>
  )
}

export default Goals