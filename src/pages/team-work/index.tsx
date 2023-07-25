import { useEffect, useState } from "react"
import { ITeam } from "../../models/team"
import { useGetJoinTeam, useJoinTeam } from "../../services/team"
import { notification } from "antd"
import TeamMessage from "./message"

const TeamWork = () => {
    
    const { data:teams,refetch,isLoading }  = useGetJoinTeam()
    const [currentTeam,setCurrentTeam] = useState<ITeam>()
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: Notification,desc:string) => {
        //@ts-ignore
        api[type]({
          message: 'Bildirim',
          description:
            desc,
        });
      };
      useEffect(()=>{
      },[currentTeam,setCurrentTeam,isLoading])
      const handleTeamClick = (team:ITeam) => {
        setCurrentTeam(team);
      };
    return(
        <>
        {contextHolder}
        <div className="flex h-screen">
      {/* Sol tarafta Teams listesi */}
      <div className="w-1/4 p-4 " >
        <h2 className="text-xl font-bold mb-4">Takımlar</h2>
        <ul>
          {teams?.map((team) => (
            <li
              key={team.id}
              className={`cursor-pointer p-2 ${
                currentTeam?.id === team.id ? 'bg-purple-500 text-white' : ''
              } block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg`}
              onClick={() => handleTeamClick(team)}
            >
              {team.name}
            </li>
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