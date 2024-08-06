import { FaHamburger, FaHeart, FaShieldAlt, FaTint } from "react-icons/fa";
import { Flex } from "../../../common";
import { useSessionInfo } from "../../../hooks";
import { useState } from "react";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";

export function PlayerStats() {
    const { userInfo } = useSessionInfo();
    const roleplayStats = useRoleplayStats(userInfo?.userId);

    return (
        <div className="nitro-player-stats">
            <Flex center fullWidth>
                <div className="game-ui">
                    <div className="status-bar">
                        <div className="bar-container">
                            <div className="bar hunger">
                                <div className="bar-fill" style={{ width: "75%" }}></div>
                                <FaHamburger className="icon" />
                                <span className="percent">{roleplayStats.hungerNow}%</span>
                            </div>
                        </div>
                        <div className="bar-container">
                            <div className="bar thirst">
                                <div className="bar-fill" style={{ width: "60%" }}></div>
                                <FaTint className="icon" />
                                <span className="percent">60%</span>
                            </div>
                        </div>
                        <div className="bar-container">
                            <div className="bar shield">
                                <div className="bar-fill" style={{ width: "40%" }}></div>
                                <FaShieldAlt className="icon" />
                                <span className="percent">40%</span>
                            </div>
                        </div>
                    </div>
                    <div className="status-bar">
                        <div className="bar-container full-width">
                            <div className="bar health">
                                <div className="bar-fill" style={{ width: "80%" }}></div>
                                <FaHeart className="icon" />
                                <span className="percent">80%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Flex>
        </div>
    )
}