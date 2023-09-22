import React from 'react';
import { FlexedContainer, TabContentWrapper, TabsWrapper, Tab, TabContentHolder, TabContent} from "../../styles/wrapper-components";
import TopHeader from '../../components/top-header/top-header';
import DonationsTab from "./donations/donationsTab";
import ReadersTab from "./readers/readersTab";
import ConfigsTab from "./configs/configsTab";
import ActiveConfigsTab from './activeConfigs/activeConfigsTab';

export default function AdminPortal() {
    const [activeTab, setActiveTab] = React.useState('donations');
    function tabChange(tabName) {
        setActiveTab(tabName);
    }

    return (
        <>
{/* HEADER-------------------------------------------------------------------------------------------------------------- */}
            <TopHeader></TopHeader>
            <FlexedContainer>
{/* RIGHT SIDE TABS---------------------------------------------------------------------------------------------------- */}
                <TabContentWrapper>
                    <TabsWrapper>
                        <Tab className={activeTab === 'donations' ? 'active' : ''} onClick={(e) => tabChange('donations')}>Donations</Tab>
                        <Tab className={activeTab === 'readers' ? 'active' : ''} onClick={(e) => tabChange('readers')}>Stripe Readers</Tab>
                        <Tab className={activeTab === 'configs' ? 'active' : ''} onClick={(e) => tabChange('configs')}>Configurations</Tab>
                        <Tab className={activeTab === 'active_configs' ? 'active' : ''} onClick={(e) => tabChange('active_configs')}>Active Configs</Tab>
                    </TabsWrapper>
{/* CONTENT OF EACH TAB---------------------------------------------------------------------------------------------------- */}
                    <TabContentHolder>
                        <TabContent>
                            {activeTab === 'donations' && <DonationsTab></DonationsTab>}
                            {activeTab === 'readers' && <ReadersTab></ReadersTab>}
                            {activeTab === 'configs' && <ConfigsTab></ConfigsTab>}
                            {activeTab === 'active_configs' && <ActiveConfigsTab></ActiveConfigsTab>}
                        </TabContent>
                    </TabContentHolder>
                </TabContentWrapper>
            </FlexedContainer>
        </>
    )
}