import React from 'react';
import { Check } from 'lucide-react';

const Memberships = () => {
    const plans = [
        {
            name: "1 Month Package",
            price: "₹800",
            period: "/month",
            features: [
                "Full Gym Access",
                "Locker Room Access",
                "Free Weights Area",
                "Cardio Equipment"
            ],
            color: "border-gray-800",
            buttonPrefix: "Select"
        },
        {
            name: "6 Months Package",
            price: "₹4400",
            period: "/6 months",
            features: [
                "Full Gym Access",
                "Locker Room Access",
                "Free Weights Area",
                "Group Classes",
                "1 PT Session / Month"
            ],
            color: "border-primary shadow-primary/20 shadow-xl",
            buttonPrefix: "Upgrade to",
            popular: true
        },
        {
            name: "12 Months Package",
            price: "₹8800",
            period: "/year",
            features: [
                "24/7 VIP Access",
                "Dedicated Locker",
                "Unlimited Group Classes",
                "4 PT Sessions / Month",
                "Sauna & Spa Access",
                "Nutrition Plan"
            ],
            color: "border-accent shadow-accent/20 shadow-xl",
            buttonPrefix: "Upgrade to"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bebas tracking-wider text-white">Membership Plans</h1>
                <p className="mt-4 text-gray-400 text-lg">Choose the right path for your fitness journey.</p>
                <div className="h-1 w-20 bg-primary mx-auto mt-6 rounded"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, idx) => (
                    <div key={idx} className={`bg-secondary p-8 rounded-xl border relative flex flex-col ${plan.color}`}>
                        {plan.popular && (
                            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                MOST POPULAR
                            </div>
                        )}
                        <h2 className="text-2xl font-bebas text-white mb-2">{plan.name}</h2>
                        <div className="flex items-baseline mb-6">
                            <span className="text-4xl font-bebas text-white">{plan.price}</span>
                            <span className="text-gray-400 ml-2">{plan.period}</span>
                        </div>
                        
                        <div className="flex-grow">
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center text-gray-300">
                                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button className={`w-full py-3 rounded font-medium transition-colors ${plan.popular ? 'bg-primary hover:bg-red-600 text-white' : 'bg-transparent border border-gray-600 hover:border-white text-white'}`}>
                            {plan.buttonPrefix} {plan.name}
                        </button>
                         <p className="text-xs text-gray-500 text-center mt-3">Contact staff at front desk to process the upgrade.</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Memberships;
