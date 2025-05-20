import type { FC } from 'react'
import Lottie from 'lottie-react'

import robotAnimation from '@/assets/lottie/robotAnimation.json'
import type { RobotAnimationProps } from './types'



export const RobotAnimation: FC<RobotAnimationProps> = ({ playerNum, isLoading=false, parentClassName="" }) =>
	<section className={parentClassName}>
		<Lottie
			animationData={robotAnimation}
			loop={true}
			className="w-full h-[300px]"
		/>
		<p className="text-white font-semibold">{`${isLoading ? "Loading ":""}Player ${playerNum}`}</p>
	</section>

