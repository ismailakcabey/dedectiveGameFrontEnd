import { useEffect, useState } from "react"
import { ITeam } from "../../models/team"
import { useGetJoinTeam } from "../../services/team"
import TeamMessage from "./message"
import { Link } from "react-router-dom"

const TeamWork = () => {
    
    const { data:teams,isLoading }  = useGetJoinTeam()
    const [currentTeam,setCurrentTeam] = useState<ITeam>()
      useEffect(()=>{
      },[currentTeam,setCurrentTeam,isLoading])
      const handleTeamClick = (team:ITeam) => {
        setCurrentTeam(team);
      };
    return(
        <>
        <div className="flex h-screen">
      {/* Sol tarafta Teams listesi */}
      <div className="w-1/4 p-4 " >
        <h2 className="text-xl font-bold mb-4">Takımlar</h2>
        <ul>
          {teams?.map((team) => (
            <Link to={"/team/work/"+team.id}>
            <li
              key={team.id}
              className={`cursor-pointer p-2 ${
                currentTeam?.id === team.id ? 'bg-purple-500 text-white' : ''
              } block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg`}
              onClick={() => handleTeamClick(team)}
            >
              {team.name}
            </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* Sağ tarafta seçilen Team'in index bilgisi */}
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">{currentTeam?.name} takımına ait mesajlaşmalar</h2>
        <TeamMessage 
        //@ts-ignore
        team={currentTeam?.id}/>
      </div>
    </div>
        </>
    )
}

export default TeamWork